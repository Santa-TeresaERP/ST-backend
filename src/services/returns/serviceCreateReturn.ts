import { v4 as uuidv4 } from 'uuid'
import Return from '@models/returns'
import Product from '@models/product'
import Sale from '@models/sale'
import SaleDetail from '@models/saleDetail'
import { returnValidation } from '../../schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'
import useWarehouseStore from '@services/warehouseStore'

const serviceCreateReturn = async (
  body: returnsAttributes,
): Promise<Return> => {
  const validation = returnValidation(body)

  if (!validation.success) {
    console.error(validation.error.format())
    throw new Error('Validación fallida')
  }

  const {
    id = uuidv4(),
    productId,
    salesId,
    reason,
    observations,
    quantity,
  } = validation.data

  if (!productId) {
    throw new Error('El ID del producto es obligatorio')
  }

  const product = await Product.findByPk(productId)
  if (!product) {
    throw new Error('Producto no encontrado')
  }

  const unitPrice = product.price
  const price = unitPrice * quantity

  // 📦 Buscar la venta para obtener el storeId
  const sale = await Sale.findByPk(salesId)
  if (!sale) {
    throw new Error('Venta no encontrada')
  }

  const storeId = sale.store_id

  // 🔍 Si es una devolución, validar que no se devuelva más de lo que se vendió
  if (reason === 'devuelto') {
    // Buscar el detalle de venta específico para este producto
    const saleDetail = await SaleDetail.findOne({
      where: {
        saleId: salesId,
        productId: productId,
      },
    })

    if (!saleDetail) {
      console.error(
        `❌ No se encontró el producto ${productId} en la venta ${salesId}`,
      )
      throw new Error('Este producto no fue vendido en esta venta')
    }

    // Calcular cuánto ya se ha devuelto de este producto en esta venta
    const existingReturns = await Return.findAll({
      where: {
        salesId: salesId,
        productId: productId,
        reason: 'devuelto',
      },
    })

    const totalReturned = existingReturns.reduce(
      (sum, returnItem) => sum + returnItem.quantity,
      0,
    )

    const availableToReturn = saleDetail.quantity - totalReturned

    console.log(
      `📊 Validación de devolución - Producto: ${productId}, Venta: ${salesId}`,
    )
    console.log(`📦 Cantidad original vendida: ${saleDetail.quantity}`)
    console.log(`🔄 Cantidad ya devuelta: ${totalReturned}`)
    console.log(`✅ Cantidad disponible para devolver: ${availableToReturn}`)
    console.log(`🎯 Cantidad a devolver ahora: ${quantity}`)

    if (quantity > availableToReturn) {
      console.error(
        `❌ ERROR: Se intenta devolver ${quantity} unidades, pero solo se pueden devolver ${availableToReturn} unidades. (Vendido: ${saleDetail.quantity}, Ya devuelto: ${totalReturned})`,
      )
      throw new Error(
        `No se puede devolver ${quantity} unidades. Solo se pueden devolver ${availableToReturn} unidades de este producto en esta venta.`,
      )
    }

    console.log('✅ Validación de devolución exitosa')
  }

  // 🔍 Buscar el inventario
  const warehouseStore =
    await useWarehouseStore.serviceGetWarehouseStoreByStoreAndProduct({
      storeId,
      productId,
    })

  if (!warehouseStore) {
    throw new Error('Producto no encontrado en el inventario de esta tienda')
  }

  // ↕️ Lógica condicional según la razón
  let updatedQuantity = warehouseStore.quantity

  if (reason === 'devuelto') {
    updatedQuantity += quantity
  }

  // 💾 Actualizar el inventario
  await useWarehouseStore.serviceUpdateWarehouseStore(warehouseStore.id, {
    quantity: updatedQuantity,
  })

  // 📝 Actualizar las observaciones de la venta original
  if (reason === 'devuelto') {
    const returnInfo = `Devolución: ${quantity} unidad(es) de "${product.name}"`

    // Obtener las observaciones actuales de la venta
    const currentObservations = sale.observations || ''

    // Agregar la nueva información de devolución
    let updatedObservations = ''
    if (currentObservations.trim() !== '') {
      updatedObservations = `${currentObservations}. ${returnInfo}`
    } else {
      updatedObservations = returnInfo
    }

    // Actualizar la venta con las nuevas observaciones
    await sale.update({
      observations: updatedObservations,
    })

    console.log(
      `✅ Observaciones de la venta actualizadas: ${updatedObservations}`,
    )
  }

  // 📝 Crear la devolución
  try {
    const newReturn = await Return.create({
      id,
      productId: productId ?? null,
      salesId: salesId ?? null,
      reason: reason ?? '',
      observations: observations ?? undefined,
      quantity,
      price,
    })

    console.log(
      `✅ Devolución creada exitosamente para ${quantity} unidad(es) de "${product.name}"`,
    )
    return newReturn
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Error desconocido al registrar devolución',
    )
  }
}

export default serviceCreateReturn
