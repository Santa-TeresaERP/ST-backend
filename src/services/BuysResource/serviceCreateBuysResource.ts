import BuysResource from '@models/buysResource'
import { buysResourceValidation } from 'src/schemas/almacen/BuysResourceSchema'
import { buysResourceAttributes } from '@type/almacen/buys_resource'
import serviceCreateWarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'
import Supplier from '@models/suplier'

const serviceCreateBuysResource = async (body: buysResourceAttributes) => {
  const validation = buysResourceValidation(body)

  if (!validation.success) {
    // Devuelve el error detallado de validación
    return {
      error: 'Error de validación',
      details: validation.error.errors,
      body, // Incluye el body recibido para depuración
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
    // Obtener información del proveedor para usar en las observaciones
    const supplier = await Supplier.findByPk(supplier_id)
    const supplierName = supplier ? supplier.suplier_name : `ID: ${supplier_id}`

    // Verificar si ya existe un registro con las mismas relaciones
    const existingResource = await BuysResource.findOne({
      where: {
        warehouse_id,
        resource_id,
        supplier_id,
      },
    })

    if (existingResource) {
      // Si existe, actualizar sumando la cantidad y recalculando el costo total
      const newQuantity = existingResource.quantity + quantity
      const newTotalCost = newQuantity * unit_price

      const updatedResource = await existingResource.update({
        type_unit,
        unit_price,
        total_cost: newTotalCost,
        quantity: newQuantity,
        entry_date,
      })

      // Crear movimiento de almacén para la cantidad agregada
      const movementResult = await serviceCreateWarehouseMovementResource({
        warehouse_id,
        resource_id,
        movement_type: 'entrada',
        quantity, // Solo la cantidad agregada, no la total
        movement_date: entry_date,
        observations: `Compra actualizada - Cantidad agregada: ${quantity}. Proveedor: ${supplierName}`,
      })

      if ('error' in movementResult) {
        console.warn(
          'Error al crear movimiento de almacén:',
          movementResult.error,
        )
      }

      return {
        resource: updatedResource,
        movement: movementResult,
        action: 'updated',
        message: `Registro actualizado exitosamente. Cantidad anterior: ${existingResource.quantity}, cantidad agregada: ${quantity}, nueva cantidad total: ${newQuantity}`,
      }
    }

    // Si no existe, crear un nuevo registro
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

    // Crear movimiento de almacén para la nueva compra
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

    return {
      resource: newWarehouseResource,
      movement: movementResult,
      action: 'created',
      message: 'Registro creado exitosamente',
    }
  } catch (error: unknown) {
    // Devuelve el error real de la base de datos con detalles
    if (error instanceof Error) {
      return {
        error: 'Error al crear el Dato de compra',
        details: error.message,
        stack: error.stack,
        body, // Incluye el body recibido para depuración
      }
    }
    return {
      error: 'Error desconocido al crear el Dato de compra',
      body,
    }
  }
}

export default serviceCreateBuysResource
