// Utilidad para validar y corregir la fecha
function getValidDate(dateValue: string | Date): Date {
  if (!dateValue) return new Date();
  if (dateValue instanceof Date && !isNaN(dateValue.getTime())) return dateValue;
  if (typeof dateValue === 'string') {
    // Si ya tiene la parte de la hora, no concatenar
    const dateStr = dateValue.includes('T') ? dateValue : dateValue + 'T00:00:00';
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;
  }
  // Si todo falla, retorna la fecha actual
  return new Date()
}
import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from '../../schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import sequelize from '@config/database' // Importar sequelize para transacciones
import Recipe from '@models/recipe'
import BuysResource from '@models/buysResource'
import Resource from '@models/resource'
import WarehouseProduct from '@models/warehouseProduct'
import { convertQuantity, areUnitsCompatible } from './unitConversionService'
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product'
import serviceCreatewarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'

const serviceCreateProduction = async (body: productionAttributes) => {
  console.log(
    '🔍 Iniciando serviceCreateProduction con body:',
    JSON.stringify(body, null, 2),
  )

  const validation = productionValidation(body)
  if (!validation.success) {
    console.log('❌ Error de validación:', validation.error.errors)
    return { error: validation.error.errors }
  }
  console.log('✅ Validación exitosa')

  const { productId, quantityProduced, productionDate, observation, plant_id } =
    validation.data

  // Iniciar transacción
  const t = await sequelize.transaction()

  try {
    console.log('🔍 Buscando producto:', productId)
    const product = await Product.findByPk(productId, { transaction: t })
    if (!product) {
      await t.rollback()
      console.log('❌ Producto no encontrado')
      return { error: 'El producto no existe' }
    }
    console.log('✅ Producto encontrado:', product.name)

    console.log('🔍 Buscando planta:', plant_id)
    const plant = await PlantProduction.findByPk(plant_id, { transaction: t })
    if (!plant) {
      await t.rollback()
      console.log('❌ Planta no encontrada')
      return { error: 'La planta no existe' }
    }
    console.log('✅ Planta encontrada:', plant.plant_name)

    if (!plant.warehouse_id) {
      await t.rollback()
      return { error: 'La planta de producción no tiene un almacén asociado.' }
    }

    // Obtener la receta del producto
    console.log('🔍 Buscando recetas para el producto...')
    const recipeItems = await Recipe.findAll({
      where: { productId },
      transaction: t,
    })
    console.log(`📋 Recetas encontradas: ${recipeItems.length}`)

    // Procesar consumo de recursos según recetas
    for (const item of recipeItems) {
      const { resourceId, quantity, unit } = item
      console.log(
        `🔍 Procesando recurso ${resourceId}, cantidad requerida por unidad: ${quantity} ${unit}`,
      )

      // Obtener el nombre del recurso
      const resource = await Resource.findByPk(resourceId, {
        attributes: ['name'],
        transaction: t,
      })
      const resourceName = resource?.name || 'Recurso desconocido'

      // Calcular la cantidad total requerida para la producción
      const totalRequiredInRecipeUnit = quantity * quantityProduced
      console.log(
        `📊 Cantidad total requerida en receta: ${totalRequiredInRecipeUnit} ${unit}`,
      )

      // Obtener los recursos disponibles en BuysResource
      const buysResources = await BuysResource.findAll({
        where: { resource_id: resourceId },
        order: [['entry_date', 'ASC']], // Usar FIFO para consumir recursos
        transaction: t,
      })
      console.log(`📦 Registros de compra encontrados: ${buysResources.length}`)

      // Calcular stock disponible total y convertir unidades si es necesario
      let totalAvailableInRecipeUnit = 0
      const processedBuys: Array<{
        buy: (typeof buysResources)[0]
        convertedQuantity: number
        originalQuantity: number
      }> = []

      for (const buy of buysResources) {
        if (areUnitsCompatible(buy.type_unit, unit)) {
          const convertedQuantity = convertQuantity(
            buy.quantity,
            buy.type_unit,
            unit,
          )
          if (convertedQuantity !== null) {
            totalAvailableInRecipeUnit += convertedQuantity
            processedBuys.push({
              buy,
              convertedQuantity,
              originalQuantity: buy.quantity,
            })
            console.log(
              `📦 Compra ID: ${buy.id}, Stock: ${buy.quantity} ${buy.type_unit} = ${convertedQuantity} ${unit}`,
            )
          } else {
            console.log(`⚠️ Error en conversión para compra ${buy.id}`)
          }
        } else {
          console.log(
            `⚠️ Unidades incompatibles: ${buy.type_unit} (compra) vs ${unit} (receta)`,
          )
        }
      }

      console.log(
        `📊 Cantidad total disponible: ${totalAvailableInRecipeUnit} ${unit}`,
      )

      if (totalAvailableInRecipeUnit < totalRequiredInRecipeUnit) {
        console.log(
          `⚠️ Stock insuficiente para recurso ${resourceId}. Disponible: ${totalAvailableInRecipeUnit} ${unit}, Requerido: ${totalRequiredInRecipeUnit} ${unit}. Continuando con stock negativo.`,
        )
      }

      let remainingRequiredInRecipeUnit = totalRequiredInRecipeUnit

      // Procesar registros existentes con conversión de unidades
      for (const processedBuy of processedBuys) {
        if (remainingRequiredInRecipeUnit <= 0) break

        const { buy, convertedQuantity } = processedBuy
        console.log(
          `🔄 Procesando compra ID: ${buy.id}, cantidad disponible: ${convertedQuantity} ${unit} (original: ${buy.quantity} ${buy.type_unit})`,
        )

        if (convertedQuantity >= remainingRequiredInRecipeUnit) {
          // Calcular cuánto descontar en la unidad original de compra
          const quantityToDeductInOriginalUnit = convertQuantity(
            remainingRequiredInRecipeUnit,
            unit,
            buy.type_unit,
          )

          if (quantityToDeductInOriginalUnit !== null) {
            console.log(
              `✅ Descontando ${remainingRequiredInRecipeUnit} ${unit} = ${quantityToDeductInOriginalUnit} ${buy.type_unit} de la compra ${buy.id}`,
            )
            await buy.update(
              {
                quantity: buy.quantity - quantityToDeductInOriginalUnit,
              },
              { transaction: t },
            )
            remainingRequiredInRecipeUnit = 0
          }
        } else {
          // Consume todo el recurso y continúa con el siguiente
          console.log(
            `✅ Consumiendo completamente la compra ${buy.id} (${convertedQuantity} ${unit})`,
          )
          remainingRequiredInRecipeUnit -= convertedQuantity
          await buy.update({ quantity: 0 }, { transaction: t })
        }
      }

      // Si aún queda cantidad requerida y hay al menos un registro de compra, usar el último para permitir valores negativos
      if (remainingRequiredInRecipeUnit > 0 && processedBuys.length > 0) {
        const lastBuy = processedBuys[processedBuys.length - 1].buy

        // Convertir la cantidad restante a la unidad del último registro
        const quantityToDeductInOriginalUnit = convertQuantity(
          remainingRequiredInRecipeUnit,
          unit,
          lastBuy.type_unit,
        )

        if (quantityToDeductInOriginalUnit !== null) {
          console.log(
            `⚠️ Restando cantidad faltante ${remainingRequiredInRecipeUnit} ${unit} = ${quantityToDeductInOriginalUnit} ${lastBuy.type_unit} del último registro (ID: ${lastBuy.id}). Permitiendo valor negativo.`,
          )
          await lastBuy.update(
            {
              quantity: lastBuy.quantity - quantityToDeductInOriginalUnit,
            },
            { transaction: t },
          )
          remainingRequiredInRecipeUnit = 0
        }
      }

      // Si aún queda cantidad y no hay registros de compra, mostrar advertencia
      if (remainingRequiredInRecipeUnit > 0) {
        console.log(
          `⚠️ No hay registros de compra para el recurso ${resourceId}. Cantidad faltante: ${remainingRequiredInRecipeUnit} ${unit}`,
        )
      }

      // Crear movimiento de recurso en almacén (salida por consumo)
      console.log('🔍 Creando movimiento de recurso en almacén (salida)...')
      const movementResult = await serviceCreatewarehouseMovementResource(
        {
          warehouse_id: plant.warehouse_id,
          resource_id: resourceId, // ID del recurso consumido
          movement_type: 'salida',
          quantity: totalRequiredInRecipeUnit,
          movement_date: new Date(),
          observations: `Consumo de recurso "${resourceName}" para produccion`,
        },
        t, // Pasar la transacción
      )

      if (movementResult.error) {
        await t.rollback()
        console.log(
          '❌ Error creando movimiento de recurso en almacén:',
          movementResult.error,
        )
        return {
          error: 'Error creando movimiento de recurso en almacén',
          details: movementResult.error,
        }
      }

      console.log(`✅ Movimiento de recurso ${resourceId} creado exitosamente`)
      console.log(`✅ Recurso ${resourceId} procesado exitosamente`)
    }

    // Crear registro de producción
    console.log('🔍 Creando registro de producción...')
    const newProduction = await Production.create(
      {
        productId,
        quantityProduced,
        productionDate,
        observation: observation ?? '',
        plant_id,
      },
      { transaction: t },
    )
    console.log('✅ Producción creada con ID:', newProduction.id)

    // Crear movimiento de producto en almacén (entrada por producción)
    console.log('🔍 Creando movimiento de producto en almacén...')
    const movementResult = await serviceCreatewarehouseMovementProduct(
      {
        warehouse_id: plant.warehouse_id,
        product_id: newProduction.productId,
        movement_type: 'entrada',
        quantity: newProduction.quantityProduced,
        movement_date: getValidDate(newProduction.productionDate),
        observations: `Producción de "${product.name}"`,
      },
      t, // Pasar la transacción
    )

    if (!movementResult.success) {
      await t.rollback()
      const details =
        'message' in movementResult
          ? movementResult.message
          : 'error' in movementResult
            ? movementResult.error
            : 'Error desconocido'
      console.log('❌ Error creando movimiento de almacén:', details)
      return {
        error: 'Error creando movimiento de almacén',
        details,
      }
    }
    console.log('✅ Movimiento de producto creado exitosamente')

    // Obtener el warehouse_product actualizado antes de confirmar la transacción
    const updatedWarehouseProduct = await WarehouseProduct.findOne({
      where: {
        warehouse_id: plant.warehouse_id,
        product_id: newProduction.productId,
      },
      transaction: t,
    })

    // Si todo va bien, confirmar la transacción
    await t.commit()
    console.log('✅ Transacción completada exitosamente')

    const datosFinales = {
      id: newProduction.id,
      producto: product.name,
      cantidad_producida: quantityProduced,
      fecha_produccion: productionDate,
      observacion: observation,
      planta: plant.plant_name,
      warehouse_id_movimiento: plant.warehouse_id,
      // Incluir datos actualizados del inventario para que el frontend pueda actualizar la vista
      warehouse_product_updated: updatedWarehouseProduct ? {
        id: updatedWarehouseProduct.id,
        warehouse_id: updatedWarehouseProduct.warehouse_id,
        product_id: updatedWarehouseProduct.product_id,
        quantity: updatedWarehouseProduct.quantity,
        entry_date: updatedWarehouseProduct.entry_date,
      } : null
    }

    console.log('📄 Datos de la producción creada:', datosFinales)
    return datosFinales
  } catch (error) {
    // Si hay algún error, revertir la transacción
    await t.rollback()
    console.error('❌ Error creando producción, transacción revertida:', error)
    if (error instanceof Error) {
      return {
        error: 'Error en la transacción de producción',
        message: error.message,
      }
    }
    return { error: 'Error desconocido en la transacción de producción' }
  }
}

export default serviceCreateProduction
