import Lost from '@models/lost'
import Production from '@models/production'

const updateLost = async (
  id: string,
  lostData: {
    production_id?: string
    quantity?: number
    lost_type?: string
    observations?: string
  },
) => {
  try {
    const lost = await Lost.findByPk(id)
    if (!lost) {
      return { error: 'Registro de pérdida no encontrado' }
    }

    // Validar que la producción existe si se está actualizando
    if (lostData.production_id) {
      const production = await Production.findByPk(lostData.production_id)
      if (!production) {
        return { error: 'Producción no encontrada' }
      }
    }

    await lost.update(lostData)

    return {
      message: 'Registro de pérdida actualizado exitosamente',
      lost,
    }
  } catch (error) {
    console.error('Error updating lost record:', error)
    return { error: 'Error interno del servidor' }
  }
}

export default updateLost
