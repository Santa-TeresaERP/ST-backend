import Overhead from '@models/overhead'
import { OverheadAttributes } from '@type/finanzas/overheads'
import { overheadValidation } from '../../schemas/finanzas/overheadsSchema'
import { createOverheadRecord } from './collectionOverheads/overheadRecord'

const serviceCreateOverhead = async (
  body: OverheadAttributes & { moduleName?: string },
) => {
  const validation = overheadValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  try {
    // 1. Crear el overhead en la base de datos
    const overhead = await Overhead.create(body)

    // 2. Crear el registro financiero correspondiente usando overheadRecord
    if (body.moduleName) {
      await createOverheadRecord(
        {
          name: body.name,
          date: new Date(body.date),
          type: body.type as
            | 'monasterio'
            | 'donativo'
            | 'gasto mensual'
            | 'otro ingreso'
            | 'otro egreso',
          amount: body.amount,
          description: body.description,
        },
        body.moduleName,
      )
      console.log('✅ Registro financiero creado exitosamente para overhead')
    } else {
      console.log(
        '⚠️ No se proporcionó moduleName, no se creó registro financiero',
      )
    }

    return { data: overhead }
  } catch (error) {
    console.error('❌ Error creando overhead:', error)
    return { error: 'Error al crear el overhead y su registro financiero' }
  }
}

export default serviceCreateOverhead
