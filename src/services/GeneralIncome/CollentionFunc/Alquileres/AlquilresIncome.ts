import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import Product from '@models/product'
import { returnsAttributes } from '@type/ventas/returns'

/**
 * Crea un gasto general relacionado a una devolución de venta
 */
const createReturnExpense = async (returnData: returnsAttributes) => {
  try {
    // 1. Buscar el módulo "Ventas"
    const salesModule = await Module.findOne({
      where: { name: 'Ventas' },
    })

    if (!salesModule) {
      console.error('❌ Módulo "Ventas" no encontrado')
      throw new Error('Módulo "Ventas" no encontrado')
    }

    // 2. Buscar el reporte financiero activo
    const activeReport = await FinancialReport.findOne({
      where: { status: 'activo' },
      order: [['createdAt', 'DESC']],
    })

    // 3. Buscar el producto relacionado
    const product = await Product.findByPk(returnData.productId)
    if (!product) {
      console.error('❌ Producto no relacionado a la devolución')
      throw new Error('Producto no relacionado a la devolución')
    }

    // 4. Calcular el monto total de la devolución
    const totalAmount = product.price * returnData.quantity

    // 5. Generar descripción automática del gasto
    const description = `Devolución de producto: ${product.name} - Motivo: ${returnData.reason} - Cantidad: ${returnData.quantity} - Precio unitario: $${product.price}${
      returnData.observations
        ? ` - Observaciones: ${returnData.observations}`
        : ''
    }`

    const expenseData = {
      module_id: salesModule.id,
      expense_type: 'Devolución de Venta',
      amount: totalAmount,
      date: new Date(),
      description,
      report_id: activeReport?.id || null,
    }

    console.log('🧾 Creando gasto por devolución de venta:', expenseData)

    const newExpense = await serviceCreateGeneralExpense(expenseData)

    console.log('✅ Gasto registrado correctamente')
    return newExpense
  } catch (error) {
    console.error('❌ Error al crear gasto por devolución:', error)
    throw error
  }
}

export default createReturnExpense
