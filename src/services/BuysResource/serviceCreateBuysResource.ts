import BuysResource from '@models/buysResource'
import { buysResourceValidation } from '../../schemas/almacen/BuysResourceSchema'
import { buysResourceAttributes } from '@type/almacen/buys_resource'
import serviceCreateWarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'
import Supplier from '@models/suplier'
import Warehouse from '@models/warehouse'
import { validateWarehouseStatus } from '../../schemas/almacen/warehouseSchema'

// 👇 NUEVO: crea el gasto en "Inventario" por la compra
import createResourceExpense from '@services/GeneralExpense/CollectionFunc/Inventory/ResourceExpense'

const serviceCreateBuysResource = async (body: buysResourceAttributes) => {
  const callId = Date.now().toString(36) + Math.random().toString(36).substr(2)
  console.log(`🎯 [${callId}] INICIO de serviceCreateBuysResource`)

  const validation = buysResourceValidation(body)
  if (!validation.success) {
    return {
      error: 'Error de validación',
      details: validation.error.errors,
      body,
    }
  }

  const {
    warehouse_id,
    resource_id,
    type_unit,
    unit_price,
    total_cost,
    supplier_id,
    quantity,
    entry_date,
  } = validation.data

  try {
    console.log(`🔍 [${callId}] Datos validados`, {
      warehouse_id,
      resource_id,
      supplier_id,
      quantity,
      type_unit,
      unit_price,
      total_cost,
    })

    const supplier = await Supplier.findByPk(supplier_id)
    const supplierName = supplier ? supplier.suplier_name : `ID: ${supplier_id}`

    const warehouse = await Warehouse.findByPk(warehouse_id)
    if (!warehouse) {
      return {
        success: false,
        error: 'Almacén no encontrado',
        message: undefined,
        action: undefined,
        resource: undefined,
        movement: undefined,
      }
    }

    const warehouseStatusValidation = validateWarehouseStatus({
      status: warehouse.status,
    })
    if (!warehouseStatusValidation.success) {
      return {
        success: false,
        error: warehouseStatusValidation.error,
        message: undefined,
        action: undefined,
        resource: undefined,
        movement: undefined,
      }
    }

    const existingResource = await BuysResource.findOne({
      where: { warehouse_id, resource_id, supplier_id },
    })

    if (existingResource) {
      const previousQuantity = existingResource.quantity
      const newQuantity = previousQuantity + quantity

      const updatedResource = await existingResource.update({
        type_unit,
        unit_price,
        total_cost,
        quantity: newQuantity,
        entry_date,
      })

      console.log(`🏁 [${callId}] FIN - Registro actualizado correctamente`)
      console.log(
        `🔍 [${callId}] CANTIDAD FINAL EN DB: ${updatedResource.quantity}`,
      )

      // 👇 SOLO creamos gasto al CREAR, no al actualizar
      return {
        resource: updatedResource,
        movement: { message: 'Movimiento omitido para evitar duplicación' },
        action: 'updated',
        message: `Registro actualizado exitosamente. Cantidad anterior: ${previousQuantity}, cantidad agregada: ${quantity}, nueva cantidad total: ${newQuantity}`,
      }
    }

    // ➕ Crear un nuevo registro
    const newWarehouseResource = await BuysResource.create({
      warehouse_id,
      resource_id,
      type_unit,
      unit_price,
      total_cost,
      supplier_id,
      quantity,
      entry_date,
    })

    // Movimiento de almacén
    const movementResult = await serviceCreateWarehouseMovementResource({
      warehouse_id,
      resource_id,
      movement_type: 'entrada',
      quantity,
      movement_date: entry_date,
      observations: `Nueva compra registrada. Proveedor: ${supplierName}`,
    })
    if ('error' in movementResult) {
      console.warn(
        'Error al crear movimiento de almacén:',
        movementResult.error,
      )
    }

    // 🧾 NUEVO: crear gasto de Inventario por la compra (no rompe si falla)
    try {
      await createResourceExpense({
        resource_name: String(resource_id), // si quieres el nombre real, tráelo del modelo Resource
        quantity,
        type_unit,
        unit_price,
        total_cost,
        supplier_name: supplierName,
        entry_date,
      })
    } catch (e) {
      console.warn('⚠️ No se pudo crear el gasto de inventario:', e)
    }

    console.log(`🏁 [${callId}] FIN - Nuevo registro creado correctamente`)
    return {
      resource: newWarehouseResource,
      movement: movementResult,
      action: 'created',
      message: 'Registro creado exitosamente',
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al crear el Dato de compra',
        details: error.message,
        stack: error.stack,
        body,
      }
    }
    return { error: 'Error desconocido al crear el Dato de compra', body }
  }
}

export default serviceCreateBuysResource
