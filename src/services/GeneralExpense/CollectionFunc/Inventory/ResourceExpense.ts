import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'
import { Op } from 'sequelize'

type CreateResourceExpenseInput = {
  resource_name: string
  quantity: number
  type_unit: string
  unit_price: number
  total_cost: number // solo informativo para logs
  supplier_name?: string
  entry_date: Date | string
}

/**
 * Crea un gasto en "Inventario" por una compra de recurso.
 */
const createResourceExpense = async (
  buysResourceData: CreateResourceExpenseInput,
) => {
  // --- Validaciones básicas ---
  if (!buysResourceData.resource_name)
    throw new Error('resource_name es requerido')
  if (
    !Number.isFinite(buysResourceData.quantity) ||
    buysResourceData.quantity <= 0
  ) {
    throw new Error('quantity debe ser un número > 0')
  }
  if (
    !Number.isFinite(buysResourceData.unit_price) ||
    buysResourceData.unit_price < 0
  ) {
    throw new Error('unit_price debe ser un número >= 0')
  }

  // Aceptar Date o string ISO
  const date =
    buysResourceData.entry_date instanceof Date
      ? buysResourceData.entry_date
      : new Date(buysResourceData.entry_date)
  if (isNaN(date.getTime()))
    throw new Error('entry_date debe ser una fecha válida')

  try {
    // 1) Módulo "inventario" (case-insensitive)
    const inventoryModule = await Module.findOne({
      where: { name: { [Op.iLike]: 'inventario' } },
    })
    if (!inventoryModule) {
      console.error('❌ Módulo "inventario" no encontrado')
      throw new Error('Módulo "inventario" no encontrado')
    }

    // 2) Reporte activo (opcional)
    const activeReport = await FinancialReport.findOne({
      where: { status: 'proceso' },
      order: [['createdAt', 'DESC']],
    })

    // 3) Monto (seguro) = unit_price * quantity
    const amount =
      Math.round(
        buysResourceData.unit_price * buysResourceData.quantity * 100,
      ) / 100

    // 4) Descripción
    const description =
      `Compra de recurso: ${buysResourceData.resource_name} ` +
      `(${buysResourceData.quantity} ${buysResourceData.type_unit}) - ` +
      `Precio unitario: $${buysResourceData.unit_price.toFixed(2)}` +
      (buysResourceData.supplier_name
        ? ` - Proveedor: ${buysResourceData.supplier_name}`
        : '')

    // 5) Payload
    const expenseData: GeneralExpenseAttributes = {
      module_id: inventoryModule.id,
      expense_type: 'Compra de Recursos',
      amount,
      date,
      description,
      report_id: activeReport?.id ?? null,
    }

    console.log('📝 Creando gasto de inventario:', expenseData, {
      total_cost_recibido: buysResourceData.total_cost,
      monto_calculado: amount,
    })

    const newExpense = await serviceCreateGeneralExpense(expenseData)
    console.log('✅ Gasto de inventario creado exitosamente')
    return newExpense
  } catch (error) {
    console.error('❌ Error creando gasto de inventario:', error)
    throw error
  }
}

export default createResourceExpense
