import BuysProduct from '@models/buysProduct'
import { buysProductValidation } from '../../schemas/almacen/BuysProductSchema'
import { buysProductAttributes } from '@type/almacen/buys_product'
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product'
import serviceCreateNonProducibleProduct from './serviceCreateNonProducibleProduct'
import Supplier from '@models/suplier'
import Warehouse from '@models/warehouse'
import { validateWarehouseStatus } from '../../schemas/almacen/warehouseSchema'
import { getValidDate } from '../../utils/dateUtils'

const DEFAULT_WAREHOUSE_NAME = 'Almacen monasterio'
/**
 * Interfaz extendida para crear compra de producto con opción de crear producto no producible
 */
interface CreateBuysProductInput extends buysProductAttributes {
  create_non_producible_product?: boolean
  product_name?: string
  product_description?: string
  product_category_id?: string
  product_price?: number
}

const serviceCreateBuysProduct = async (body: CreateBuysProductInput) => {
  const callId = Date.now().toString(36) + Math.random().toString(36).slice(2)
  console.log(`🎯 [${callId}] INICIO serviceCreateBuysProduct`)
  const payload = { ...body }

  try {
    if (!payload.warehouse_id) {
      const defaultWarehouse = await Warehouse.findOne({
        where: { name: DEFAULT_WAREHOUSE_NAME },
      })

      if (!defaultWarehouse) {
        return {
          success: false,
          error: `No se encontró el almacén por defecto (${DEFAULT_WAREHOUSE_NAME}).`,
          message: undefined,
          action: undefined,
          product: undefined,
          movement: undefined,
        }
      }

      payload.warehouse_id = defaultWarehouse.id
      console.log(
        `ℹ️ [${callId}] Almacén por defecto aplicado: ${DEFAULT_WAREHOUSE_NAME} (${defaultWarehouse.id})`,
      )
    }

    const validation = buysProductValidation(payload as buysProductAttributes)
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
      product_purchased_id,
      unit_price,
      total_cost,
      supplier_id,
      quantity,
      entry_date,
    } = validation.data

    console.log(`🔍 [${callId}] Datos validados`, {
      warehouse_id,
      product_purchased_id,
      supplier_id,
      quantity,
      unit_price,
      total_cost,
    })

    const [supplier, warehouse] = await Promise.all([
      Supplier.findByPk(supplier_id),
      Warehouse.findByPk(warehouse_id),
    ])

    if (!warehouse) {
      return {
        success: false,
        error: 'Almacén no encontrado',
        message: undefined,
        action: undefined,
        product: undefined,
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
        product: undefined,
        movement: undefined,
      }
    }

    const supplierName = supplier?.suplier_name ?? `ID: ${supplier_id}`

    // 2) ¿Existe registro acumulado para (almacén, producto)?
    //    Nota: Ignoramos supplier_id para no crear nuevos datos cuando cambia el proveedor
    const existingProduct = await BuysProduct.findOne({
      where: { warehouse_id, product_purchased_id },
    })

    if (existingProduct) {
      const previousQuantity = existingProduct.quantity
      const addedQuantity = quantity // delta de esta compra
      const newQuantity = previousQuantity + addedQuantity

      const updatedProduct = await existingProduct.update({
        unit_price,
        total_cost, // Recalcular el costo total
        quantity: newQuantity,
        entry_date: getValidDate(entry_date),
        supplier_id, // Actualizar al nuevo proveedor si cambió
      })

      console.log(
        `🏁 [${callId}] ACTUALIZADO: antes=${previousQuantity}, +${addedQuantity} => ${newQuantity}`,
      )

      // Crear movimiento de almacén para la cantidad agregada
      const movementResult = await serviceCreatewarehouseMovementProduct({
        warehouse_id,
        product_id: product_purchased_id,
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
        product: updatedProduct,
        movement: movementResult,
        action: 'updated',
        message: `Registro actualizado. Cantidad anterior: ${previousQuantity}, agregada: ${addedQuantity}, total: ${newQuantity}`,
      }
    }

    // 3) Crear nuevo registro
    const newWarehouseProduct = await BuysProduct.create({
      warehouse_id,
      product_purchased_id,
      unit_price,
      total_cost: Math.round(unit_price * quantity * 100) / 100,
      supplier_id,
      quantity,
      entry_date: getValidDate(entry_date),
    })

    // 3.5) Crear producto no producible si se solicita
    let nonProducibleProduct = null
    if (
      body.create_non_producible_product &&
      body.product_name &&
      body.product_category_id
    ) {
      console.log(
        `📦 [${callId}] Intentando crear producto no producible con nombre: ${body.product_name}`,
      )
      const nonProducibleResult = await serviceCreateNonProducibleProduct({
        name: body.product_name,
        category_id: body.product_category_id,
        price: body.product_price ?? unit_price,
        description: body.product_description ?? '',
        buysProductData: body,
      })
      if ('success' in nonProducibleResult && nonProducibleResult.success) {
        nonProducibleProduct = nonProducibleResult.product
        if (nonProducibleProduct) {
          console.log(
            `✅ [${callId}] Producto no producible creado: ${nonProducibleProduct.id}`,
          )
        }
      } else {
        console.warn(
          `⚠️ [${callId}] Error al crear producto no producible:`,
          'error' in nonProducibleResult
            ? nonProducibleResult.error
            : 'Error desconocido',
        )
      }
    }

    // 4) Movimiento de almacén (entrada)
    const movementResult = await serviceCreatewarehouseMovementProduct({
      warehouse_id,
      product_id: product_purchased_id,
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

    console.log(`🏁 [${callId}] CREADO`)
    return {
      success: true,
      product: newWarehouseProduct,
      movement: movementResult,
      nonProducibleProduct: nonProducibleProduct,
      action: 'created',
      message: `Registro creado exitosamente${nonProducibleProduct ? ' con producto no producible' : ''}`,
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

export default serviceCreateBuysProduct
