/* eslint-disable @typescript-eslint/no-explicit-any */
import WarehouseMovementResource from '@models/warehouseMovomentResource'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { warehouseMovementResourceValidation } from 'src/schemas/almacen/warehouseMovomentResourceSchema'
import BuysResource from '@models/buysResource' // Modelo para manejar el inventario de recursos
import Resource from '@models/resource'

const serviceCreateWarehouseMovementResource = async (
  body: WarehouseMovomentResourceAttributes,
  transaction?: any,
) => {
  console.log(
    '🔍 Iniciando serviceCreateWarehouseMovementResource con body:',
    body,
  )

  const validation = warehouseMovementResourceValidation(body)
  if (!validation.success) {
    console.log('❌ Error de validación:', validation.error.errors)
    return { error: validation.error.errors }
  }
  console.log('✅ Validación exitosa')

  const {
    warehouse_id,
    resource_id,
    movement_type,
    quantity,
    movement_date,
    observations,
  } = validation.data

  try {
    console.log('🔍 Buscando registros en BuysResource...')
    const buysResources = await BuysResource.findAll({
      where: { warehouse_id, resource_id },
      order: [['entry_date', 'ASC']],
      transaction,
    })

    if (buysResources.length === 0 && movement_type === 'salida') {
      console.log(
        '❌ No hay registros en BuysResource para el recurso especificado.',
      )
      return {
        error: 'No hay registros en el almacén para el recurso especificado.',
      }
    }

    if (movement_type === 'salida') {
      const totalAvailable = buysResources.reduce(
        (sum, buy) => sum + buy.quantity,
        0,
      )
      console.log(
        `📊 Stock total disponible: ${totalAvailable}, Cantidad requerida: ${quantity}`,
      )

      if (totalAvailable < quantity) {
        console.log('❌ Stock insuficiente para realizar la salida.')
        return {
          error:
            'No hay suficiente cantidad en el almacén para realizar la salida.',
        }
      }

      let remainingQuantity = quantity
      for (const buy of buysResources) {
        if (remainingQuantity <= 0) break

        if (buy.quantity >= remainingQuantity) {
          buy.quantity -= remainingQuantity
          await buy.save({ transaction })
          remainingQuantity = 0
        } else {
          remainingQuantity -= buy.quantity
          buy.quantity = 0
          await buy.save({ transaction })
        }
      }
    } else if (movement_type === 'entrada') {
      console.log('🔍 Creando registro de entrada en BuysResource...')
      await BuysResource.create(
        {
          warehouse_id,
          resource_id,
          quantity,
          type_unit: 'unit',
          unit_price: 0,
          total_cost: 0,
          supplier_id: 'default-supplier-id',
          entry_date: movement_date,
        },
        { transaction },
      )
    }

    const resource = await Resource.findByPk(resource_id, { transaction })
    const resourceName = resource?.name || `ID: ${resource_id}`
    console.log(`🔍 Nombre del recurso obtenido: ${resourceName}`)

    console.log(
      '🔍 Creando registro de movimiento en WarehouseMovementResource...',
    )
    const newRecord = await WarehouseMovementResource.create(
      {
        warehouse_id,
        resource_id,
        movement_type,
        quantity,
        movement_date,
        observations: observations,
      },
      { transaction },
    )

    console.log('✅ Movimiento creado exitosamente:', newRecord)
    return { newRecord }
  } catch (error) {
    console.error('❌ Error en serviceCreateWarehouseMovementResource:', error)
    if (transaction) await transaction.rollback()
    return {
      error: 'Error al registrar movimiento de recurso',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export default serviceCreateWarehouseMovementResource
