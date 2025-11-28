import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'
import { Op } from 'sequelize'

type CreateProductExpenseInput = {
  product_name: string
  quantity: number
  unit_price: number
  total_cost?: number
  warehouse_name?: string
  supplier_name?: string
  entry_date: Date | string
}

/**
 * Crea un gasto general asociado a la compra de productos para inventario.
 * Se utiliza cuando un BuysProduct debe reflejarse como egreso financiero.
 */
const createProductExpense = async (
  buysProductData: CreateProductExpenseInput,
) => {
  if (!buysProductData.product_name)
    throw new Error('product_name es requerido')
  if (
    !Number.isFinite(buysProductData.quantity) ||
    buysProductData.quantity <= 0
  ) {
    throw new Error('quantity debe ser un número > 0')
  }
  if (
    !Number.isFinite(buysProductData.unit_price) ||
    buysProductData.unit_price < 0
  ) {
    throw new Error('unit_price debe ser un número >= 0')
  }

  const date =
    buysProductData.entry_date instanceof Date
      ? buysProductData.entry_date
      : new Date(buysProductData.entry_date)
  if (isNaN(date.getTime())) {
    throw new Error('entry_date debe ser una fecha válida')
  }

  try {
    const inventoryModule = await Module.findOne({
      where: { name: { [Op.iLike]: 'inventario' } },
    })
    if (!inventoryModule) {
      console.error('❌ Módulo "inventario" no encontrado')
      throw new Error('Módulo "inventario" no encontrado')
    }

    const activeReport = await FinancialReport.findOne({
      where: { status: 'proceso' },
      order: [['createdAt', 'DESC']],
    })

    const amount =
      Math.round(buysProductData.unit_price * buysProductData.quantity * 100) /
      100

    const descriptionParts = [
      `Compra de producto: ${buysProductData.product_name}`,
      `Cantidad: ${buysProductData.quantity}`,
      `Precio unitario: S/. ${buysProductData.unit_price.toFixed(2)}`,
    ]

    if (buysProductData.warehouse_name) {
      descriptionParts.push(`Almacén: ${buysProductData.warehouse_name}`)
    }
    if (buysProductData.supplier_name) {
      descriptionParts.push(`Proveedor: ${buysProductData.supplier_name}`)
    }
    if (Number.isFinite(buysProductData.total_cost)) {
      descriptionParts.push(
        `Total declarado: S/. ${buysProductData.total_cost?.toFixed(2)}`,
      )
    }

    const expenseData: GeneralExpenseAttributes = {
      module_id: inventoryModule.id,
      expense_type: 'Compra de Productos',
      amount,
      date,
      description: descriptionParts.join(' - '),
      report_id: activeReport?.id ?? null,
    }

    console.log('📝 [Inventario][Gasto] Payload:', expenseData)
    console.log(
      activeReport
        ? `🔗 [Inventario][Gasto] Asociado a reporte activo: ${activeReport.id}`
        : '⚠️ [Inventario][Gasto] Sin reporte activo (se guarda sin asociar)',
    )

    const newExpense = await serviceCreateGeneralExpense(expenseData)
    console.log('✅ [Inventario][Gasto] Creado correctamente')
    return newExpense
  } catch (error) {
    console.error('❌ [Inventario][Gasto] Error creando gasto:', error)
    throw error
  }
}

export default createProductExpense
