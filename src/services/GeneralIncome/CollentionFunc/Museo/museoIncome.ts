// services/Museum/createMuseumIncome.ts
import serviceCreateGeneralIncome from '@services/GeneralIncome/serviceCreateGeneralIncome'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome'
import { entranceAttributes } from '@type/museo/entrance'
import { typePersonAttributes } from '@type/museo/type_person'

/**
 * Registra un ingreso general para el módulo "Museo"
 * a partir de los datos de una entrada y su tipo de persona.
 */
const createMuseumIncome = async (
  entranceData: entranceAttributes,
  typePersonData: typePersonAttributes,
) => {
  try {
    console.log('➡️ [Museo][Ingreso] Iniciando registro de ingreso...')

    // 1) Buscar módulo
    const museumModule = await Module.findOne({ where: { name: 'Museo' } })
    if (!museumModule) {
      console.error('❌ [Museo][Ingreso] Módulo "Museo" no encontrado')
      throw new Error('Módulo "Museo" no encontrado')
    }

    // 2) Reporte activo (más reciente)
    const activeReport = await FinancialReport.findOne({
      where: { status: 'activo' },
      order: [['createdAt', 'DESC']],
    })

    // 3) Calcular monto
    const rawAmount = entranceData.free
      ? 0
      : Number(entranceData.total_sale ?? typePersonData.base_price ?? 0)

    const amount = Number.isFinite(rawAmount) ? rawAmount : 0

    // 4) Descripción auto
    const descriptionParts: string[] = [
      `Venta de entrada #${entranceData.sale_number}`,
      `Tipo de persona: ${typePersonData.name}`,
      `Canal: ${entranceData.sale_channel}`,
      `Pago: ${entranceData.payment_method}`,
    ]
    if (entranceData.free) descriptionParts.push('(Entrada gratuita)')
    const description = descriptionParts.join(' - ')

    // 5) Payload
    const incomeData: GeneralIncomeAttributes = {
      module_id: museumModule.id,
      income_type: 'Entradas de Museo',
      amount, // ingreso (positivo)
      date: new Date(entranceData.sale_date),
      description,
      report_id: activeReport?.id ?? null,
    }

    console.log('📝 [Museo][Ingreso] Payload:', incomeData)
    console.log(
      activeReport
        ? `🔗 [Museo][Ingreso] Asociado a reporte activo: ${activeReport.id}`
        : '⚠️ [Museo][Ingreso] Sin reporte activo (se guarda sin asociar)',
    )

    // 6) Persistir
    const newIncome = await serviceCreateGeneralIncome(incomeData)
    console.log('✅ [Museo][Ingreso] Creado correctamente')
    return newIncome
  } catch (error) {
    console.error('❌ [Museo][Ingreso] Error creando ingreso:', error)
    throw error
  }
}

export default createMuseumIncome
