import serviceCreateGeneralIncome from '@services/GeneralIncome/serviceCreateGeneralIncome'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome'
import { buysProductAttributes } from '@type/almacen/buys_product'

/**
 * Registra un ingreso general en el módulo "Inventario"
 * cuando se vende un producto que fue comprado previamente.
 *
 * Este ingreso representa la ganancia de la venta del producto.
 */
const createProductIncome = async (
  buysProductData: buysProductAttributes & {
    product_name?: string
    warehouse_name?: string
    supplier_name?: string
    sale_price?: number // Precio de venta (mayor que unit_price)
  },
) => {
  try {
    console.log(
      '➡️ [Inventario][Ingreso] Iniciando registro de ingreso por venta de producto...',
    )

    // --- Validaciones básicas ---
    if (!buysProductData.product_purchased_id) {
      throw new Error('product_id es requerido')
    }
    if (
      !Number.isFinite(buysProductData.quantity) ||
      buysProductData.quantity <= 0
    ) {
      throw new Error('quantity debe ser un número > 0')
    }

    // 1) Buscar módulo "Inventario"
    const inventoryModule = await Module.findOne({
      where: { name: 'Inventario' },
    })
    if (!inventoryModule) {
      console.error(
        '❌ [Inventario][Ingreso] Módulo "Inventario" no encontrado',
      )
      throw new Error('Módulo "Inventario" no encontrado')
    }

    // 2) Reporte financiero activo (más reciente)
    const activeReport = await FinancialReport.findOne({
      where: { status: 'proceso' },
      order: [['createdAt', 'DESC']],
    })

    // 3) Calcular monto del ingreso
    // Si hay precio de venta, usar ese; sino usar el precio de compra (total_cost)
    const salePrice = buysProductData.sale_price ?? buysProductData.unit_price
    const rawAmount = Number(salePrice * buysProductData.quantity)
    const amount = Number.isFinite(rawAmount)
      ? Math.round(rawAmount * 100) / 100
      : 0

    // 4) Descripción automática
    const descriptionParts: string[] = [
      `Venta de producto: ${buysProductData.product_name || buysProductData.product_purchased_id}`,
      `Cantidad: ${buysProductData.quantity}`,
      `Precio unitario: S/. ${salePrice.toFixed(2)}`,
    ]
    if (buysProductData.warehouse_name) {
      descriptionParts.push(`Almacén: ${buysProductData.warehouse_name}`)
    }
    if (buysProductData.supplier_name) {
      descriptionParts.push(
        `Proveedor original: ${buysProductData.supplier_name}`,
      )
    }
    const description = descriptionParts.join(' - ')

    // 5) Convertir fecha
    const date =
      buysProductData.entry_date instanceof Date
        ? buysProductData.entry_date
        : new Date(buysProductData.entry_date)

    // 6) Payload para general_incomes
    const incomeData: GeneralIncomeAttributes = {
      module_id: inventoryModule.id,
      income_type: 'Venta de Productos',
      amount,
      date,
      description,
      report_id: activeReport?.id ?? null,
    }

    console.log('📝 [Inventario][Ingreso] Payload:', incomeData)
    console.log(
      activeReport
        ? `🔗 [Inventario][Ingreso] Asociado a reporte activo: ${activeReport.id}`
        : '⚠️ [Inventario][Ingreso] Sin reporte activo (se guarda sin asociar)',
    )

    // 7) Persistir
    const newIncome = await serviceCreateGeneralIncome(incomeData)
    console.log('✅ [Inventario][Ingreso] Creado correctamente')
    return newIncome
  } catch (error) {
    console.error('❌ [Inventario][Ingreso] Error creando ingreso:', error)
    throw error
  }
}

export default createProductIncome
