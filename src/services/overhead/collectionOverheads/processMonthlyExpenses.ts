import Overhead from '@models/overhead'
import GeneralExpense from '@models/generalExpense'
import FinancialReport from '@models/financialReport'
import Module from '@models/modules'
import serviceCreateGeneralExpense from '@services/GeneralExpense/serviceCreateGeneralExpense'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'

/**
 * Procesa todos los overheads de tipo "gasto mensual" y crea los registros
 * correspondientes en GeneralExpense, evitando duplicados
 */
export const processMonthlyExpenseOverheads = async () => {
  try {
    console.log('📋 Iniciando procesamiento de gastos mensuales...')

    // 1. Buscar reporte financiero activo
    const activeReport = await FinancialReport.findOne({
      where: { status: 'activo' },
      order: [['createdAt', 'DESC']],
    })

    if (!activeReport) {
      console.log('⚠️ No se encontró reporte financiero activo')
      return { message: 'No hay reporte financiero activo para procesar' }
    }

    console.log(`🔗 Reporte financiero activo encontrado: ${activeReport.id}`)

    // 2. Buscar todos los overheads de tipo "gasto mensual"
    const monthlyOverheads = await Overhead.findAll({
      where: {
        type: 'gasto mensual',
      },
      order: [['createdAt', 'ASC']],
    })

    if (monthlyOverheads.length === 0) {
      console.log('📭 No se encontraron overheads de tipo "gasto mensual"')
      return { message: 'No hay gastos mensuales para procesar' }
    }

    console.log(`📊 Encontrados ${monthlyOverheads.length} gastos mensuales`)

    // 3. Verificar gastos ya existentes en GeneralExpense para este reporte
    const existingExpenses = await GeneralExpense.findAll({
      where: {
        expense_type: 'Gasto Mensual',
        report_id: activeReport.id,
      },
      attributes: ['description', 'amount', 'date', 'module_id'],
    })

    console.log(
      `🔍 Encontrados ${existingExpenses.length} gastos mensuales existentes en el reporte`,
    )

    // 4. Crear un Set para identificar duplicados rápidamente
    const existingExpenseKeys = new Set(
      existingExpenses.map(
        (expense) =>
          `${expense.description}_${expense.amount}_${expense.date.toISOString().split('T')[0]}_${expense.module_id}`,
      ),
    )

    const processedExpenses = []
    const skippedExpenses = []

    // 5. Procesar cada overhead
    for (const overhead of monthlyOverheads) {
      try {
        // Buscar el módulo basado en el nombre del overhead
        // Asumimos que el módulo se puede inferir del nombre o usar uno por defecto
        const defaultModule = await Module.findOne({
          where: { name: 'Finanzas' }, // Módulo por defecto para gastos mensuales
        })

        if (!defaultModule) {
          console.error('❌ Módulo "Finanzas" no encontrado')
          continue
        }

        // Generar descripción similar a la de overheadRecord
        const description = `${overhead.name}${
          overhead.description ? ` - ${overhead.description}` : ''
        }`

        // Crear clave única para verificar duplicados
        const expenseKey = `${description}_${overhead.amount}_${new Date(overhead.date).toISOString().split('T')[0]}_${defaultModule.id}`

        // Verificar si ya existe
        if (existingExpenseKeys.has(expenseKey)) {
          console.log(`⏭️ Saltando gasto duplicado: ${overhead.name}`)
          skippedExpenses.push({
            overheadId: overhead.id,
            name: overhead.name,
            reason: 'Ya existe en GeneralExpense',
          })
          continue
        }

        // Crear el nuevo gasto
        const expenseData: GeneralExpenseAttributes = {
          module_id: defaultModule.id,
          expense_type: 'Gasto Mensual',
          amount: overhead.amount,
          date: new Date(overhead.date),
          description: description,
          report_id: activeReport.id,
        }

        console.log(`📝 Procesando gasto mensual: ${overhead.name}`)
        const newExpense = await serviceCreateGeneralExpense(expenseData)

        if ('error' in newExpense) {
          console.error(
            `❌ Error creando gasto para ${overhead.name}:`,
            newExpense.error,
          )
          skippedExpenses.push({
            overheadId: overhead.id,
            name: overhead.name,
            reason: `Error: ${newExpense.error}`,
          })
        } else {
          console.log(`✅ Gasto mensual creado: ${overhead.name}`)
          processedExpenses.push({
            overheadId: overhead.id,
            expenseId: newExpense.id,
            name: overhead.name,
            amount: overhead.amount,
          })

          // Agregar a la lista de existentes para evitar duplicados en esta ejecución
          existingExpenseKeys.add(expenseKey)
        }
      } catch (error) {
        console.error(`❌ Error procesando overhead ${overhead.id}:`, error)
        skippedExpenses.push({
          overheadId: overhead.id,
          name: overhead.name,
          reason: `Error de procesamiento: ${
            error instanceof Error ? error.message : 'Error desconocido'
          }`,
        })
      }
    }

    // 6. Resultado final
    const result = {
      totalOverheads: monthlyOverheads.length,
      processedCount: processedExpenses.length,
      skippedCount: skippedExpenses.length,
      reportId: activeReport.id,
      processedExpenses,
      skippedExpenses,
    }

    console.log('📊 Resumen del procesamiento:')
    console.log(`   Total overheads: ${result.totalOverheads}`)
    console.log(`   Procesados: ${result.processedCount}`)
    console.log(`   Saltados: ${result.skippedCount}`)

    return result
  } catch (error) {
    console.error('❌ Error en el procesamiento de gastos mensuales:', error)
    throw error
  }
}
