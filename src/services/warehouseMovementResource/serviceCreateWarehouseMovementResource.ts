/* eslint-disable @typescript-eslint/no-explicit-any */
import WarehouseMovementResource from '@models/warehouseMovomentResource'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { warehouseMovementResourceValidation } from '../../schemas/almacen/warehouseMovomentResourceSchema'
import BuysResource from '@models/buysResource'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'
import serviceUpdateWarehouseResource from '../../services/BuysResource/serviceUpdateBuysResource'
import { validateWarehouseStatus } from '../../schemas/almacen/warehouseSchema'

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
  // Para movimientos de salida por producción, buscar cualquier registro del recurso
  let warehouseResource = await BuysResource.findOne({
    where: { warehouse_id, resource_id },
    transaction,
  })

  // Si no existe un registro específico para este almacén, buscar cualquier registro del recurso
  if (!warehouseResource && movement_type === 'salida') {
    warehouseResource = await BuysResource.findOne({
      where: { resource_id },
      order: [['entry_date', 'DESC']], // Obtener el más reciente
      transaction,
    })

    // Si aún no existe, crear un registro negativo
    if (!warehouseResource) {
      console.log(
        `🔍 No hay registros existentes para el recurso ${resource_id}, creando registro base`,
      )

      // Buscar un supplier por defecto
      const defaultSupplier = await Supplier.findOne({ transaction })
      if (!defaultSupplier) {
        return {
          error: 'No se encontró supplier por defecto para crear el registro',
        }
      }

      warehouseResource = await BuysResource.create(
        {
          warehouse_id,
          resource_id,
          quantity: 0,
          type_unit: 'unit', // Unidad por defecto
          unit_price: 0,
          total_cost: 0,
          supplier_id: defaultSupplier.id!,
          entry_date: new Date(),
        },
        { transaction },
      )

      console.log(`✅ Registro base creado para el recurso ${resource_id}`)
    }
  }

  // Validar que el recurso exista en el almacén
  const warehouse = await Warehouse.findByPk(warehouse_id)
  if (!warehouse) {
    return { success: false, error: 'Almacén no encontrado' }
  }

  // Validar estado activo/inactivo del almacén usando la función del schema
  const warehouseStatusValidation = validateWarehouseStatus({
    status: warehouse.status,
  })
  if (!warehouseStatusValidation.success) {
    return warehouseStatusValidation
  }

  // Si no existe, rechazar entrada/salida (entrada debe pasar por proveedor)
  if (!warehouseResource) {
    return {
      error:
        movement_type === 'entrada'
          ? 'El recurso aún no ha sido registrado en el almacén (requiere proveedor).'
          : 'El recurso no existe en el almacén. No se puede registrar una salida.',
    }
  }

  try {
    // SALIDA: Solo actualizar stock si NO es un movimiento de producción
    // Los movimientos de producción ya actualizaron el stock previamente
    if (movement_type === 'salida' && !observations?.includes('produccion')) {
      const newQuantity = warehouseResource.quantity - quantity

      console.log(
        `📉 Actualizando stock a: ${newQuantity} (Recurso ID: ${warehouseResource.id})`,
      )

      const updateResult = await serviceUpdateWarehouseResource(
        warehouseResource.id!,
        {
          quantity: newQuantity, // Puede ser negativo
        },
      )

      if ('error' in updateResult) {
        console.log('❌ Error al actualizar stock:', updateResult.error)
        return {
          error: 'Error al actualizar el stock de buy_resource.',
          details: updateResult.error,
        }
      }

      console.log('✅ Stock actualizado correctamente')
    } else if (
      movement_type === 'salida' &&
      observations?.includes('produccion')
    ) {
      console.log(
        '📝 Movimiento de producción - stock ya actualizado previamente',
      )
    }

    // Registrar el movimiento en warehouse_movement_resources
    const newRecord = await WarehouseMovementResource.create(
      {
        warehouse_id,
        resource_id,
        movement_type,
        quantity,
        movement_date,
        observations: observations ?? null,
      },
      { transaction },
    )

    return { newRecord }
  } catch (error) {
    console.error('❌ Error en serviceCreateWarehouseMovementResource:', error)
    return {
      error: 'Error al procesar el movimiento de recursos',
      details: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceCreateWarehouseMovementResource
