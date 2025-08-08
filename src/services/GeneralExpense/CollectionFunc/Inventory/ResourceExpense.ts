import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'

/**
 * Crea un registro de gasto general relacionado al módulo "Inventario"
 * cuando se compra un recurso (BuysResource)
 */
const createResourceExpense = async (buysResourceData: {
  resource_name: string
  quantity: number
  type_unit: string
  unit_price: number
  total_cost: number
  supplier_name?: string
  entry_date: Date
}) => {
  try {
    // 1. Buscar el módulo "Inventario"
    const inventoryModule = await Module.findOne({
      where: { name: 'Inventario' },
    })

    if (!inventoryModule) {
      console.error('❌ Módulo "Inventario" no encontrado')
      throw new Error('Módulo "Inventario" no encontrado')
    }

    // 2. Buscar un reporte financiero activo para asociar el gasto
    const activeReport = await FinancialReport.findOne({
      where: { status: 'activo' },
      order: [['createdAt', 'DESC']], // Obtener el más reciente
    })

    // 3. Usar el costo total directamente del BuysResource
    const totalAmount = buysResourceData.total_cost

    // 4. Generar descripción automática con los datos de la compra
    const autoDescription = `Compra de recurso: ${buysResourceData.resource_name} (${buysResourceData.quantity} ${buysResourceData.type_unit}) - Precio unitario: $${buysResourceData.unit_price}${
      buysResourceData.supplier_name
        ? ` - Proveedor: ${buysResourceData.supplier_name}`
        : ''
    }`

    // 5. Preparar datos del gasto general
    const expenseData: GeneralExpenseAttributes = {
      module_id: inventoryModule.id,
      expense_type: 'Compra de Recursos',
      amount: totalAmount,
      date: buysResourceData.entry_date,
      description: autoDescription,
      report_id: activeReport?.id || null, // Asociar con reporte activo si existe
    }

    console.log('📝 Creando gasto de inventario:', expenseData)
    if (activeReport) {
      console.log(
        `🔗 Asociando con reporte financiero activo: ${activeReport.id}`,
      )
    } else {
      console.log(
        '⚠️ No se encontró reporte financiero activo, gasto sin asociar',
      )
    }

    const newExpense = await serviceCreateGeneralExpense(expenseData)

    console.log('✅ Gasto de inventario creado exitosamente')
    return newExpense
  } catch (error) {
    console.error('❌ Error creando gasto de inventario:', error)
    throw error
  }
}

export default createResourceExpense
