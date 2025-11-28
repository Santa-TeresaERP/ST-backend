import saleDetail from '@models/saleDetail'
import Sale from '@models/sale'
import { SaleDetailAttributes } from '@type/ventas/saleDetail'
import { saleDetailValidation } from '../../schemas/ventas/saleDetailSchema'
import useWarehouseStore from '@services/warehouseStore'
import BuysProduct from '@models/buysProduct'
import Product from '@models/product'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'
import createProductIncome from '@services/GeneralIncome/CollentionFunc/Inventory/ProductIncome'

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

  // 📊 Registrar ingreso en GeneralIncome por la venta del producto
  try {
    // Buscar el BuysProduct más reciente para este producto (puede haber varios)
    const buysProduct = await BuysProduct.findOne({
      where: {
        product_purchased_id: productId,
        status: true,
      },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name'],
        },
        {
          model: Warehouse,
          as: 'warehouse',
          attributes: ['name'],
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['name'],
        },
      ],
      order: [['entry_date', 'DESC']], // Más reciente primero
    })

    if (buysProduct) {
      // Calcular precio unitario de venta (mount / quantity)
      const saleUnitPrice = mount / quantity

      // Obtener datos relacionados de forma segura
      const buysProductData = buysProduct.get({ plain: true })
      const productName =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (buysProductData as any).product?.name || 'Producto'

      const warehouseName =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (buysProductData as any).warehouse?.name || 'Almacén'
      const supplierName =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (buysProductData as any).supplier?.name || 'Proveedor'

      await createProductIncome({
        warehouse_id: buysProduct.warehouse_id,
        product_purchased_id: buysProduct.product_purchased_id,
        unit_price: buysProduct.unit_price,
        total_cost: buysProduct.total_cost,
        supplier_id: buysProduct.supplier_id,
        quantity: quantity, // Cantidad vendida (no la del BuysProduct)
        entry_date: new Date(), // Fecha de la venta
        status: buysProduct.status,
        product_name: productName,
        warehouse_name: warehouseName,
        supplier_name: supplierName,
        sale_price: saleUnitPrice, // Precio al que se vendió
      })

      console.log(
        `✅ [SaleDetail] Ingreso registrado para producto: ${productId}`,
      )
    } else {
      console.warn(
        `⚠️ [SaleDetail] No se encontró BuysProduct para producto ${productId}, ingreso no registrado`,
      )
    }
  } catch (error) {
    console.error(
      `❌ [SaleDetail] Error registrando ingreso para producto ${productId}:`,
      error,
    )
    // No falla la operación si el registro de ingreso falla
  }

  return newSaleDetail
}

export default serviceCreateSaleDetail
