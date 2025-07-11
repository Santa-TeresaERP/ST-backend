import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import Recipe from '@models/recipe'
import BuysResource from '@models/buysResource'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'
import { convertQuantity, areUnitsCompatible } from './unitConversionService'

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

  console.log('🔍 Buscando producto:', productId)
  const product = await Product.findByPk(productId)
  if (!product) {
    console.log('❌ Producto no encontrado')
    return { error: 'El producto no existe' }
  }
  console.log('✅ Producto encontrado:', product.name)

  console.log('🔍 Buscando planta:', plant_id)
  const plant = await PlantProduction.findByPk(plant_id)
  if (!plant) {
    console.log('❌ Planta no encontrada')
    return { error: 'La planta no existe' }
  }
  console.log('✅ Planta encontrada:', plant.plant_name)

  console.log('🔍 Creando registro de producción...')
  const newProduction = await Production.create({
    productId,
    quantityProduced,
    productionDate,
    observation: observation ?? '',
    plant_id,
  })
  console.log('✅ Producción creada con ID:', newProduction.id)

  // Obtener la receta del producto
  console.log('🔍 Buscando recetas para el producto...')
  const recipeItems = await Recipe.findAll({ where: { productId } })
  console.log(`📋 Recetas encontradas: ${recipeItems.length}`)

  if (recipeItems.length === 0) {
    console.log(
      '⚠️ No se encontraron recetas para el producto, continuando sin consumir recursos',
    )
  }

  for (const item of recipeItems) {
    const { resourceId, quantity, unit } = item
    console.log(
      `🔍 Procesando recurso ${resourceId}, cantidad requerida por unidad: ${quantity} ${unit}`,
    )

    // Calcular la cantidad total requerida para la producción
    const totalRequiredInRecipeUnit = quantity * quantityProduced
    console.log(
      `📊 Cantidad total requerida en receta: ${totalRequiredInRecipeUnit} ${unit}`,
    )

    // Obtener los recursos disponibles en BuysResource
    const buysResources = await BuysResource.findAll({
      where: { resource_id: resourceId },
      order: [['entry_date', 'ASC']], // Usar FIFO para consumir recursos
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

    // Obtener el primer warehouse y supplier para registros negativos
    const defaultWarehouse = await Warehouse.findOne()
    const defaultSupplier = await Supplier.findOne()

    if (!defaultWarehouse || !defaultSupplier) {
      console.log('❌ No se encontró warehouse o supplier por defecto')
      return {
        error:
          'No se encontró warehouse o supplier por defecto para crear registros negativos',
      }
    }

    // Si no hay registros de compra compatibles, crear uno negativo
    if (processedBuys.length === 0) {
      console.log(
        `⚠️ No hay registros de compra compatibles para el recurso ${resourceId}, creando registro negativo`,
      )
      await BuysResource.create({
        resource_id: resourceId,
        supplier_id: defaultSupplier.id!,
        quantity: -totalRequiredInRecipeUnit,
        unit_price: 0,
        total_cost: 0,
        type_unit: unit, // Usar la unidad de la receta
        entry_date: new Date(),
        warehouse_id: defaultWarehouse.id,
      })
      remainingRequiredInRecipeUnit = 0
    } else {
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
            await buy.update({
              quantity: buy.quantity - quantityToDeductInOriginalUnit,
            })
            remainingRequiredInRecipeUnit = 0
          }
        } else {
          // Consume todo el recurso y continúa con el siguiente
          console.log(
            `✅ Consumiendo completamente la compra ${buy.id} (${convertedQuantity} ${unit})`,
          )
          remainingRequiredInRecipeUnit -= convertedQuantity
          await buy.update({ quantity: 0 })
        }
      }

      // Si aún queda cantidad requerida después de procesar todos los registros
      if (remainingRequiredInRecipeUnit > 0) {
        console.log(
          `⚠️ Cantidad restante: ${remainingRequiredInRecipeUnit} ${unit}, creando registro negativo`,
        )
        await BuysResource.create({
          resource_id: resourceId,
          supplier_id: defaultSupplier.id!,
          quantity: -remainingRequiredInRecipeUnit,
          unit_price: 0,
          total_cost: 0,
          type_unit: unit, // Usar la unidad de la receta
          entry_date: new Date(),
          warehouse_id: defaultWarehouse.id,
        })
      }
    }

    console.log(`✅ Recurso ${resourceId} procesado exitosamente`)
  }

  const datosFinales = {
    id: newProduction.id,
    producto: product.name,
    cantidad_producida: quantityProduced,
    fecha_produccion: productionDate,
    observacion: observation,
    planta: plant.plant_name,
  }

  console.log('📄 Datos de la producción creada:', datosFinales)
  return datosFinales
}

export default serviceCreateProduction
