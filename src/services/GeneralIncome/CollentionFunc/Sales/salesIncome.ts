// services/Sales/createSalesIncome.ts
import serviceCreateGeneralIncome from '@services/GeneralIncome/serviceCreateGeneralIncome'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome'
import { salesAttributes } from '@type/ventas/sale'

/**
 * Registra un ingreso general para el módulo "Ventas"
 * a partir de un registro de venta (sales).
 */
const createSalesIncome = async (saleData: salesAttributes) => {
  try {
    console.log('➡️ [Ventas][Ingreso] Iniciando registro de ingreso...')

    // 1) Buscar módulo
    const salesModule = await Module.findOne({ where: { name: 'Ventas' } })
    if (!salesModule) {
      console.error('❌ [Ventas][Ingreso] Módulo "Ventas" no encontrado')
      throw new Error('Módulo "Ventas" no encontrado')
    }

    // 2) Reporte financiero activo (más reciente)
    const activeReport = await FinancialReport.findOne({
      where: { status: 'proceso' },
      order: [['createdAt', 'DESC']],
    })

    // 3) Monto (total de la venta)
    const rawAmount = Number(saleData.total_income ?? 0)
    const amount = Number.isFinite(rawAmount) ? rawAmount : 0

    // 4) Descripción automática
    const descriptionParts: string[] = [
      `Registro de venta`,
      `Tienda: ${saleData.store_id}`,
    ]
    if (saleData.observations)
      descriptionParts.push(`Obs: ${saleData.observations}`)
    const description = descriptionParts.join(' - ')

    // 5) Payload para general_incomes
    const incomeData: GeneralIncomeAttributes = {
      module_id: salesModule.id,
      income_type: 'Ventas',
      amount,
      date: new Date(saleData.income_date),
      description,
      report_id: activeReport?.id ?? null,
    }

    console.log('📝 [Ventas][Ingreso] Payload:', incomeData)
    console.log(
      activeReport
        ? `🔗 [Ventas][Ingreso] Asociado a reporte activo: ${activeReport.id}`
        : '⚠️ [Ventas][Ingreso] Sin reporte activo (se guarda sin asociar)',
    )

    // 6) Persistir
    const newIncome = await serviceCreateGeneralIncome(incomeData)
    console.log('✅ [Ventas][Ingreso] Creado correctamente')
    return newIncome
  } catch (error) {
    console.error('❌ [Ventas][Ingreso] Error creando ingreso:', error)
    throw error
  }
}

export default createSalesIncome
