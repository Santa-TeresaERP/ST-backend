import BuysResource from '@models/buysResource'
import { buysResourceValidation } from '../../schemas/almacen/BuysResourceSchema'
import { buysResourceAttributes } from '@type/almacen/buys_resource'
import serviceCreateWarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'
import Supplier from '@models/suplier'
import Warehouse from '@models/warehouse'
import Resource from '@models/resource'
import { validateWarehouseStatus } from '../../schemas/almacen/warehouseSchema'
import { getValidDate } from '../../utils/dateUtils'

// Creador de gasto por compra en Inventario
import createResourceExpense from '@services/GeneralExpense/CollectionFunc/Inventory/ResourceExpense'

const serviceCreateBuysResource = async (body: buysResourceAttributes) => {
  const callId = Date.now().toString(36) + Math.random().toString(36).slice(2)
  console.log(`🎯 [${callId}] INICIO serviceCreateBuysResource`)

  // 1) Validación
  const validation = buysResourceValidation(body)
  if (!validation.success) {
    return {
      success: false,
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

    const [supplier, warehouse, resource] = await Promise.all([
      Supplier.findByPk(supplier_id),
      Warehouse.findByPk(warehouse_id),
      Resource.findByPk(resource_id),
    ])

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

    const supplierName = supplier?.suplier_name ?? `ID: ${supplier_id}`
    const resourceName = resource?.name ?? String(resource_id)

    // 2) ¿Existe registro acumulado para (almacén, recurso)?
    //    Nota: Ignoramos supplier_id para no crear nuevos datos cuando cambia el proveedor
    const existingResource = await BuysResource.findOne({
      where: { warehouse_id, resource_id },
    })

    if (existingResource) {
      const previousQuantity = existingResource.quantity
      const addedQuantity = quantity // delta de esta compra
      const newQuantity = previousQuantity + addedQuantity
      const newPurchaseCost = Math.round(unit_price * addedQuantity * 100) / 100

      const updatedResource = await existingResource.update({
        type_unit,
        unit_price,
        total_cost, // Recalcular el costo total
        quantity: newQuantity,
        entry_date: getValidDate(entry_date),
        supplier_id, // Actualizar al nuevo proveedor si cambió
      })

      console.log(
        `🏁 [${callId}] ACTUALIZADO: antes=${previousQuantity}, +${addedQuantity} => ${newQuantity}`,
      )

      // 💰 GASTO por el DELTA de la compra
      try {
        await createResourceExpense({
          resource_name: resourceName,
          quantity: addedQuantity, // solo el agregado
          type_unit,
          unit_price,
          total_cost: newPurchaseCost,
          supplier_name: supplierName,
          entry_date, // puede ser Date o string (collector lo normaliza)
        })
      } catch (e) {
        console.warn('⚠️ No se pudo crear el gasto (delta) de inventario:', e)
      }

      // Crear movimiento de almacén para la cantidad agregada
      const movementResult = await serviceCreateWarehouseMovementResource({
        warehouse_id,
        resource_id,
        movement_type: 'entrada',
        quantity: addedQuantity,
        movement_date: getValidDate(entry_date),
        observations: `Nueva compra registrada. Proveedor: ${supplierName}`,
      })
      if ('error' in movementResult) {
        console.warn(
          '⚠️ Error al crear movimiento de almacén en actualización:',
          movementResult.error,
        )
      }

      return {
        success: true,
        resource: updatedResource,
        movement: movementResult,
        action: 'updated',
        message: `Registro actualizado. Cantidad anterior: ${previousQuantity}, agregada: ${addedQuantity}, total: ${newQuantity}`,
      }
    }

    // 3) Crear nuevo registro
    const newWarehouseResource = await BuysResource.create({
      warehouse_id,
      resource_id,
      type_unit,
      unit_price,
      total_cost: Math.round(unit_price * quantity * 100) / 100,
      supplier_id,
      quantity,
      entry_date: getValidDate(entry_date),
    })

    // 4) Movimiento de almacén (entrada)
    const movementResult = await serviceCreateWarehouseMovementResource({
      warehouse_id,
      resource_id,
      movement_type: 'entrada',
      quantity,
      movement_date: getValidDate(entry_date),
      observations: `Nueva compra registrada. Proveedor: ${supplierName}`,
    })
    if ('error' in movementResult) {
      console.warn(
        '⚠️ Error al crear movimiento de almacén:',
        movementResult.error,
      )
    }

    // 5) Gasto contable por la compra
    try {
      await createResourceExpense({
        resource_name: resourceName,
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

    console.log(`🏁 [${callId}] CREADO`)
    return {
      success: true,
      resource: newWarehouseResource,
      movement: movementResult,
      action: 'created',
      message: 'Registro creado exitosamente',
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: 'Error al crear el Dato de compra',
        details: error.message,
        stack: error.stack,
        body,
      }
    }
    return {
      success: false,
      error: 'Error desconocido al crear el Dato de compra',
      body,
    }
  }
}

export default serviceCreateBuysResource
