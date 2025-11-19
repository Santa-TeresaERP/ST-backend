// services/Church/createChurchIncome.ts
import serviceCreateGeneralIncome from '@services/GeneralIncome/serviceCreateGeneralIncome'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome'
import { IncomeChurchAttributes } from '@type/church/income_church' // Ajusta la ruta de importación según tu estructura

/**
 * Registra un ingreso general para el módulo "Iglesia"
 * a partir de un registro de la tabla INCOME_CHURCH.
 */
const createChurchIncome = async (churchData: IncomeChurchAttributes) => {
  try {
    console.log('➡️ [Iglesia][Ingreso] Iniciando registro de ingreso...')

    // --- Validaciones básicas ---
    if (!churchData.price || churchData.price < 0) {
      throw new Error('El precio (monto) es requerido y debe ser positivo')
    }

    // 1) Buscar módulo "Iglesia"
    // NOTA: Asegúrate de que en tu tabla 'Modules' el nombre sea 'Iglesia' (o el que corresponda)
    const churchModule = await Module.findOne({ where: { name: 'Iglesia' } })

    if (!churchModule) {
      console.error('❌ [Iglesia][Ingreso] Módulo "Iglesia" no encontrado')
      throw new Error('Módulo "Iglesia" no encontrado')
    }

    // 2) Reporte financiero activo (más reciente)
    const activeReport = await FinancialReport.findOne({
      where: { status: 'proceso' },
      order: [['createdAt', 'DESC']],
    })

    // 3) Monto
    const rawAmount = Number(churchData.price ?? 0)
    const amount = Number.isFinite(rawAmount) ? rawAmount : 0

    // 4) Descripción automática
    const descriptionParts: string[] = [
      `Ingreso Iglesia: ${churchData.name}`, // Ej: "Juan Perez" o "Colecta matutina"
      `Tipo: ${churchData.type}`, // Ej: "donativo", "limosna"
    ]

    // Si quieres agregar el ID de la iglesia a la descripción (opcional)
    if (churchData.idChurch) {
      descriptionParts.push(`ID Iglesia: ${churchData.idChurch}`)
    }

    const description = descriptionParts.join(' - ')

    // 5) Payload para general_incomes
    const incomeData: GeneralIncomeAttributes = {
      module_id: churchModule.id,
      income_type: churchData.type, // Usamos el tipo específico (donativo, limosna, etc.)
      amount,
      date: new Date(churchData.date),
      description,
      report_id: activeReport?.id ?? null,
    }

    console.log('📝 [Iglesia][Ingreso] Payload:', incomeData)
    console.log(
      activeReport
        ? `🔗 [Iglesia][Ingreso] Asociado a reporte activo: ${activeReport.id}`
        : '⚠️ [Iglesia][Ingreso] Sin reporte activo (se guarda sin asociar)',
    )

    // 6) Persistir
    const newIncome = await serviceCreateGeneralIncome(incomeData)
    console.log('✅ [Iglesia][Ingreso] Creado correctamente')
    return newIncome
  } catch (error) {
    console.error('❌ [Iglesia][Ingreso] Error creando ingreso:', error)
    throw error
  }
}

export default createChurchIncome
