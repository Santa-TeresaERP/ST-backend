import Overhead from '@models/overhead'
import MonasteryExpense from '@models/monasteryexpense'
import { OverheadAttributes } from '@type/finanzas/overheads'
import { overheadValidation } from '../../schemas/finanzas/overheadsSchema'
import { createOverheadRecord } from './collectionOverheads/overheadRecord'
import { Transaction } from 'sequelize'

const serviceCreateMonasterioOH = async (
  body: OverheadAttributes,
  transaction?: Transaction,
) => {
  // Forzar el tipo a "monasterio" independientemente del valor enviado
  const bodyWithMonasterioType = {
    ...body,
    type: 'monasterio' as const,
  }

  const validation = overheadValidation(bodyWithMonasterioType)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  try {
    // 1. Crear el overhead en la base de datos
    const overhead = await Overhead.create(bodyWithMonasterioType, {
      transaction,
    })

    // 2. Asociar todos los MonasteryExpense que no tienen overhead asignado
    let unassignedExpenses: MonasteryExpense[] = []
    try {
      unassignedExpenses = await MonasteryExpense.findAll({
        where: { overheadsId: null },
        transaction,
      })

      if (unassignedExpenses.length > 0) {
        await MonasteryExpense.update(
          { overheadsId: overhead.id },
          {
            where: { overheadsId: null },
            transaction,
          },
        )
        console.log(
          `✅ ${unassignedExpenses.length} gastos de monasterio asociados al overhead`,
        )
      } else {
        console.log('ℹ️  No hay gastos de monasterio sin asignar')
      }
    } catch (error) {
      console.warn(
        '⚠️  Error al asociar MonasteryExpense (problema de foreign key):',
        error instanceof Error ? error.message : error,
      )
      console.log(
        '💡 Para solucionarlo, ejecuta el archivo fix-foreign-key.sql en la base de datos',
      )
      // Continuar sin asociar - el overhead y GeneralExpense se crearán normalmente
    }

    // 3. Crear el registro financiero correspondiente usando overheadRecord
    // Para tipo "monasterio", el moduleName no se usa ya que siempre usa "Monasterio"
    const financialRecord = await createOverheadRecord(
      {
        name: bodyWithMonasterioType.name,
        date: new Date(bodyWithMonasterioType.date),
        type: 'monasterio',
        amount: bodyWithMonasterioType.amount,
        description: bodyWithMonasterioType.description,
      },
      '', // moduleName vacío porque "monasterio" usa módulo fijo "Monasterio"
    )

    console.log(
      '✅ Registro financiero de monasterio creado exitosamente:',
      financialRecord,
    )
    return {
      data: overhead,
      financialRecord: financialRecord,
      associatedExpenses: unassignedExpenses.length,
    }
  } catch (error) {
    console.error('❌ Error creando overhead de monasterio:', error)
    return {
      error:
        'Error al crear el overhead de monasterio y su registro financiero',
    }
  }
}

export default serviceCreateMonasterioOH
