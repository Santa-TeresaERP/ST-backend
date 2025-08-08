import saleDetail from '@models/saleDetail'
import Sale from '@models/sale'
import { SaleDetailAttributes } from '@type/ventas/saleDetail'
import { saleDetailValidation } from '../../schemas/ventas/saleDetailSchema'
import useWarehouseStore from '@services/warehouseStore'

const serviceCreateSaleDetail = async (body: SaleDetailAttributes) => {
  const validation = saleDetailValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { saleId, productId, quantity, mount } = validation.data

  // Crear el saleDetail
  const newSaleDetail = await saleDetail.create({
    saleId,
    productId,
    quantity,
    mount,
  })

  // Buscar la venta para obtener el store_id
  const relatedSale = await Sale.findByPk(saleId)
  if (!relatedSale) {
    return { error: 'Venta no encontrada para el saleId proporcionado' }
  }

  const storeId = relatedSale.store_id

  // ✅ Buscar el inventario por storeId y productId usando el nuevo servicio
  const warehouseStore =
    await useWarehouseStore.serviceGetWarehouseStoreByStoreAndProduct({
      storeId,
      productId,
    })

  if (!warehouseStore) {
    return { error: 'Producto no encontrado en el inventario de esta tienda' }
  }

  // Actualizar la cantidad (restar lo vendido)
  const newQuantity = warehouseStore.quantity - quantity

  await useWarehouseStore.serviceUpdateWarehouseStore(warehouseStore.id, {
    quantity: newQuantity,
  })

  return newSaleDetail
}

export default serviceCreateSaleDetail
