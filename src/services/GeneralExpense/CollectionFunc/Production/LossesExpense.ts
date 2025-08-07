import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import Module from '@models/modules'
import Production from '@models/production'
import Product from '@models/product'
import FinancialReport from '@models/financialReport'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'

/**
 * Crea un registro de gasto general relacionado al módulo "Producción"
 * cuando ocurren pérdidas en la producción
 */
const createLossesExpense = async (lostData: {
  production_id: string
  quantity: number
  lost_type: string
  observations?: string
  created_at: Date
}) => {
  try {
    // 1. Buscar el módulo "Producción"
    const productionModule = await Module.findOne({
      where: { name: 'Producción' },
    })

    if (!productionModule) {
      console.error('❌ Módulo "Producción" no encontrado')
      throw new Error('Módulo "Producción" no encontrado')
    }

    // 2. Buscar un reporte financiero activo para asociar el gasto
    const activeReport = await FinancialReport.findOne({
      where: { status: 'activo' },
      order: [['createdAt', 'DESC']], // Obtener el más reciente
    })

    // 3. Obtener la producción relacionada con la pérdida
    const production = await Production.findByPk(lostData.production_id, {
      include: [
        {
          model: Product,
          foreignKey: 'productId',
          attributes: ['id', 'name', 'price'],
        },
      ],
    })

    if (!production) {
      console.error('❌ Producción no encontrada')
      throw new Error('Producción no encontrada')
    }

    // 4. Obtener el producto relacionado directamente por productId
    const product = await Product.findByPk(production.productId, {
      attributes: ['id', 'name', 'price'],
    })

    if (!product) {
      console.error('❌ Producto relacionado a la producción no encontrado')
      throw new Error('Producto relacionado a la producción no encontrado')
    }

    // 5. Calcular el monto del gasto (precio del producto × cantidad perdida)
    const totalAmount = product.price * lostData.quantity

    // 6. Generar descripción automática
    const autoDescription = `Pérdida en producción: ${product.name} - Tipo: ${lostData.lost_type} - Cantidad perdida: ${lostData.quantity} unidades - Precio unitario: $${product.price}${
      lostData.observations ? ` - Observaciones: ${lostData.observations}` : ''
    }`

    // 7. Preparar datos del gasto general
    const expenseData: GeneralExpenseAttributes = {
      module_id: productionModule.id,
      expense_type: 'Pérdidas de Producción',
      amount: totalAmount,
      date: lostData.created_at,
      description: autoDescription,
      report_id: activeReport?.id || null, // Asociar con reporte activo si existe
    }

    console.log('📝 Creando gasto por pérdidas de producción:', expenseData)
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

    console.log('✅ Gasto por pérdidas de producción creado exitosamente')
    return newExpense
  } catch (error) {
    console.error('❌ Error creando gasto por pérdidas:', error)
    throw error
  }
}

export default createLossesExpense
