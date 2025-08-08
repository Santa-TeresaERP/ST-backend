import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import Return from '@models/returns'
import Product from '@models/product'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'

/**
 * Crea un registro de gasto general relacionado al módulo "Ventas"
 * cuando ocurren devoluciones de productos
 */
const createReturnExpense = async (returnId: string) => {
  try {
    // 1. Buscar el módulo "Ventas"
    const salesModule = await Module.findOne({
      where: { name: 'Ventas' },
    })

    if (!salesModule) {
      console.error('❌ Módulo "Ventas" no encontrado')
      throw new Error('Módulo "Ventas" no encontrado')
    }

    // 2. Buscar un reporte financiero activo para asociar el gasto
    const activeReport = await FinancialReport.findOne({
      where: { status: 'activo' },
      order: [['createdAt', 'DESC']],
    })

    // 3. Obtener la devolución y su producto relacionado
    const returnData = (await Return.findByPk(returnId, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price'],
        },
      ],
    })) as Return & { product: Product } // 👈 solución aquí

    if (!returnData) {
      console.error('❌ Devolución no encontrada')
      throw new Error('Devolución no encontrada')
    }

    const product = returnData.product
    if (!product) {
      console.error('❌ Producto no relacionado a la devolución')
      throw new Error('Producto no relacionado a la devolución')
    }

    // 4. Calcular el monto total de la devolución
    const totalAmount = product.price * returnData.quantity

    // 5. Generar descripción automática
    const autoDescription = `Devolución de producto: ${product.name} - Motivo: ${returnData.reason} - Cantidad devuelta: ${returnData.quantity} unidades - Precio unitario: $${product.price}${
      returnData.observations
        ? ` - Observaciones: ${returnData.observations}`
        : ''
    }`

    // 6. Preparar datos para gasto general
    const expenseData: GeneralExpenseAttributes = {
      module_id: salesModule.id,
      expense_type: 'Devoluciones de Venta',
      amount: totalAmount,
      date: new Date(), // o usar returnData.createdAt si se requiere
      description: autoDescription,
      report_id: activeReport?.id || null,
    }

    console.log('📝 Creando gasto por devolución de producto:', expenseData)

    if (activeReport) {
      console.log(
        `🔗 Asociado con reporte financiero activo: ${activeReport.id}`,
      )
    } else {
      console.log('⚠️ No hay reporte activo, se guardará sin asociar')
    }

    const newExpense = await serviceCreateGeneralExpense(expenseData)

    console.log('✅ Gasto por devolución registrado correctamente')
    return newExpense
  } catch (error) {
    console.error('❌ Error creando gasto por devolución:', error)
    throw error
  }
}

export default createReturnExpense
