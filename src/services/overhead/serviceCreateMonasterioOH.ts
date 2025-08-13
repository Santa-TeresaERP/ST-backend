import Overhead from '@models/overhead'
import { OverheadAttributes } from '@type/finanzas/overheads'
import { overheadValidation } from '../../schemas/finanzas/overheadsSchema'
import { createOverheadRecord } from './collectionOverheads/overheadRecord'

const serviceCreateMonasterioOH = async (body: OverheadAttributes) => {
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
    const overhead = await Overhead.create(bodyWithMonasterioType)

    // 2. Crear el registro financiero correspondiente usando overheadRecord
    // Para tipo "monasterio", el moduleName no se usa ya que siempre usa "Monasterio"
    await createOverheadRecord(
      {
        name: bodyWithMonasterioType.name,
        date: new Date(bodyWithMonasterioType.date),
        type: 'monasterio',
        amount: bodyWithMonasterioType.amount,
        description: bodyWithMonasterioType.description,
      },
      '', // moduleName vacío porque "monasterio" usa módulo fijo "Monasterio"
    )

    console.log('✅ Registro financiero de monasterio creado exitosamente')
    return { data: overhead }
  } catch (error) {
    console.error('❌ Error creando overhead de monasterio:', error)
    return {
      error:
        'Error al crear el overhead de monasterio y su registro financiero',
    }
  }
}

export default serviceCreateMonasterioOH
