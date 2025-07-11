import BuysResource from '@models/buysResource'
import { buysResourceValidation } from 'src/schemas/almacen/BuysResourceSchema'
import { buysResourceAttributes } from '@type/almacen/buys_resource'
import serviceCreateWarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'
import Supplier from '@models/suplier'

const serviceCreateBuysResource = async (body: buysResourceAttributes) => {
  // Agregar timestamp único para rastrear llamadas
  const callId = Date.now().toString(36) + Math.random().toString(36).substr(2)
  console.log(`🎯 [${callId}] INICIO de serviceCreateBuysResource`)

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
    console.log(
      `🔍 [${callId}] Iniciando serviceCreateBuysResource con datos:`,
      {
        warehouse_id,
        resource_id,
        supplier_id,
        quantity,
        type_unit,
        unit_price,
        total_cost,
      },
    )

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

    console.log(
      '📦 Registro existente encontrado:',
      existingResource
        ? {
            id: existingResource.id,
            currentQuantity: existingResource.quantity,
            currentUnit: existingResource.type_unit,
          }
        : 'No existe',
    )

    if (existingResource) {
      // Si existe, actualizar sumando solo la cantidad (sin recalcular el costo total)
      const previousQuantity = existingResource.quantity
      const newQuantity = previousQuantity + quantity

      console.log('🔄 Actualizando registro existente:', {
        previousQuantity,
        quantityToAdd: quantity,
        newQuantity,
      })

      const updatedResource = await existingResource.update({
        type_unit,
        unit_price,
        total_cost, // Mantener el costo total del input, no recalcular
        quantity: newQuantity,
        entry_date,
      })

      console.log('✅ Registro actualizado:', {
        id: updatedResource.id,
        finalQuantity: updatedResource.quantity,
      })

      // NOTA: No llamamos a serviceCreateWarehouseMovementResource para actualizaciones
      // porque ya manejamos la cantidad correctamente y evitamos duplicación
      console.log(
        `📝 [${callId}] Saltando creación de movimiento para evitar duplicación`,
      )

      console.log(`🏁 [${callId}] FIN - Registro actualizado correctamente`)
      console.log(
        `🔍 [${callId}] CANTIDAD FINAL EN DB: ${updatedResource.quantity}`,
      )

      return {
        resource: updatedResource,
        movement: { message: 'Movimiento omitido para evitar duplicación' },
        action: 'updated',
        message: `Registro actualizado exitosamente. Cantidad anterior: ${previousQuantity}, cantidad agregada: ${quantity}, nueva cantidad total: ${newQuantity}`,
      }
    }

    // Si no existe, crear un nuevo registro
    console.log('➕ Creando nuevo registro con cantidad:', quantity)

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

    console.log('✅ Nuevo registro creado:', {
      id: newWarehouseResource.id,
      quantity: newWarehouseResource.quantity,
      type_unit: newWarehouseResource.type_unit,
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

    console.log(`🏁 [${callId}] FIN - Nuevo registro creado correctamente`)

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
