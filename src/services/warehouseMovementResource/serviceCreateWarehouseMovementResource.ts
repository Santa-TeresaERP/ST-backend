/* eslint-disable @typescript-eslint/no-explicit-any */
import WarehouseMovementResource from '@models/warehouseMovomentResource'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { warehouseMovementResourceValidation } from 'src/schemas/almacen/warehouseMovomentResourceSchema'
import BuysResource from '@models/buysResource'
import serviceUpdateWarehouseResource from 'src/services/BuysResource/serviceUpdateBuysResource'

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

  // Buscar el recurso actual en stock (buy_resource)
  const warehouseResource = await BuysResource.findOne({
    where: { warehouse_id, resource_id },
  })

  // Si no existe, rechazar entrada/salida (entrada debe pasar por proveedor)
  if (!warehouseResource) {
    return {
      error:
        movement_type === 'entrada'
          ? 'El recurso aún no ha sido registrado en el almacén (requiere proveedor).'
          : 'El recurso no existe en el almacén. No se puede registrar una salida.',
    }
  }

  // SALIDA: Permitir stock negativo y actualizar buy_resource
  if (movement_type === 'salida') {
    const newQuantity = warehouseResource.quantity - quantity

    console.log(
      `📉 Actualizando stock a: ${newQuantity} (Recurso ID: ${warehouseResource.id})`,
    )

    const updateResult = await serviceUpdateWarehouseResource(
      warehouseResource.id!,
      {
        warehouse_id: warehouseResource.warehouse_id,
        resource_id: warehouseResource.resource_id,
        type_unit: warehouseResource.type_unit,
        unit_price: warehouseResource.unit_price,
        total_cost: warehouseResource.total_cost,
        supplier_id: warehouseResource.supplier_id,
        entry_date: warehouseResource.entry_date,
        quantity: newQuantity, // Puede ser negativo
      },
    )

    if ('error' in updateResult) {
      console.log('❌ Error al actualizar stock:', updateResult.error)
      return {
        error: 'Error al actualizar el stock de buy_resource.',
        details: updateResult.error,
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

    console.log('✅ Stock actualizado correctamente')
  }

  // ENTRADA: No modifica el stock, solo registra el movimiento

  // Registrar el movimiento en warehouse_movement_resources
  const newRecord = await WarehouseMovementResource.create({
    warehouse_id,
    resource_id,
    movement_type,
    quantity,
    movement_date,
    observations: observations ?? null,
  })

  return { newRecord }
}

export default serviceCreateWarehouseMovementResource
