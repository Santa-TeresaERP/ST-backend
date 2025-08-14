import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'
import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome'
import serviceCreateGeneralIncome from '@services/GeneralIncome/serviceCreateGeneralIncome'

export const createOverheadRecord = async (
  overheadData: {
    name: string
    date: Date
    type:
      | 'monasterio'
      | 'donativo'
      | 'gasto mensual'
      | 'otro ingreso'
      | 'otro egreso'
    amount: number
    description?: string
  },
  moduleName: string,
) => {
  try {
    // 1. Buscar un reporte financiero activo para asociar
    const activeReport = await FinancialReport.findOne({
      where: { status: 'activo' },
      order: [['createdAt', 'DESC']], // Obtener el más reciente
    })

    let moduleId: string

    switch (overheadData.type) {
      case 'donativo':
      case 'monasterio': {
        // Buscar el módulo "Monasterio" para donativos y monasterio
        const monasterioModule = await Module.findOne({
          where: { name: 'Monasterio' },
        })

        if (!monasterioModule) {
          console.error('❌ Módulo "Monasterio" no encontrado')
          throw new Error('Módulo "Monasterio" no encontrado')
        }

        moduleId = monasterioModule.id

        if (overheadData.type === 'donativo') {
          // Crear ingreso general para donativos
          const incomeData: GeneralIncomeAttributes = {
            module_id: moduleId,
            income_type: 'Donativo',
            amount: overheadData.amount,
            date: overheadData.date,
            description: `${overheadData.name}${
              overheadData.description ? ` - ${overheadData.description}` : ''
            }`,
            report_id: activeReport?.id || null,
          }

          console.log('📝 Creando ingreso por donativo:', incomeData)
          const newIncome = await serviceCreateGeneralIncome(incomeData)
          console.log('✅ Ingreso por donativo creado exitosamente')
          return newIncome
        } else {
          // Crear gasto general para monasterio
          const expenseData: GeneralExpenseAttributes = {
            module_id: moduleId,
            expense_type: 'Gasto de Monasterio',
            amount: overheadData.amount,
            date: overheadData.date,
            description: `${overheadData.name}${
              overheadData.description ? ` - ${overheadData.description}` : ''
            }`,
            report_id: activeReport?.id || null,
          }

          console.log('📝 Creando gasto de monasterio:', expenseData)
          const newExpense = await serviceCreateGeneralExpense(expenseData)
          console.log('✅ Gasto de monasterio creado exitosamente')
          return newExpense
        }
      }

      case 'gasto mensual': {
        // Buscar el módulo específico por el nombre proporcionado
        const specificModule = await Module.findOne({
          where: { name: moduleName },
        })

        if (!specificModule) {
          console.error(`❌ Módulo "${moduleName}" no encontrado`)
          throw new Error(`Módulo "${moduleName}" no encontrado`)
        }

        const expenseData: GeneralExpenseAttributes = {
          module_id: specificModule.id,
          expense_type: 'Gasto Mensual',
          amount: overheadData.amount,
          date: overheadData.date,
          description: `${overheadData.name}${
            overheadData.description ? ` - ${overheadData.description}` : ''
          }`,
          report_id: activeReport?.id || null,
        }

        console.log('📝 Creando gasto mensual:', expenseData)
        const newExpense = await serviceCreateGeneralExpense(expenseData)
        console.log('✅ Gasto mensual creado exitosamente')
        return newExpense
      }

      case 'otro ingreso':
      case 'otro egreso': {
        // Buscar el módulo específico por el nombre proporcionado
        const specificModule = await Module.findOne({
          where: { name: moduleName },
        })

        if (!specificModule) {
          console.error(`❌ Módulo "${moduleName}" no encontrado`)
          throw new Error(`Módulo "${moduleName}" no encontrado`)
        }

        if (overheadData.type === 'otro ingreso') {
          // Crear ingreso general
          const incomeData: GeneralIncomeAttributes = {
            module_id: specificModule.id,
            income_type: 'Otro Ingreso',
            amount: overheadData.amount,
            date: overheadData.date,
            description: `${overheadData.name}${
              overheadData.description ? ` - ${overheadData.description}` : ''
            }`,
            report_id: activeReport?.id || null,
          }

          console.log('📝 Creando otro ingreso:', incomeData)
          const newIncome = await serviceCreateGeneralIncome(incomeData)
          console.log('✅ Otro ingreso creado exitosamente')
          return newIncome
        } else {
          // Crear gasto general
          const expenseData: GeneralExpenseAttributes = {
            module_id: specificModule.id,
            expense_type: 'Otro Egreso',
            amount: overheadData.amount,
            date: overheadData.date,
            description: `${overheadData.name}${
              overheadData.description ? ` - ${overheadData.description}` : ''
            }`,
            report_id: activeReport?.id || null,
          }

          console.log('📝 Creando otro egreso:', expenseData)
          const newExpense = await serviceCreateGeneralExpense(expenseData)
          console.log('✅ Otro egreso creado exitosamente')
          return newExpense
        }
      }

      default:
        throw new Error(`Tipo de overhead no válido: ${overheadData.type}`)
    }
  } catch (error) {
    console.error('❌ Error creando registro de overhead:', error)
    throw error
  }
}
