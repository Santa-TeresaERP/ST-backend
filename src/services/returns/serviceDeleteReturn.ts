import Return from '@models/returns'

const serviceDeleteReturn = async (id: string) => {
  const existing = await Return.findByPk(id)
  if (!existing) return { error: 'Devolución no encontrada' }

  await existing.destroy().catch((error) => {
    return { error: 'Error al eliminar la devolución', details: error.message }
  })

  return { message: 'Devolución eliminada correctamente' }
}

export default serviceDeleteReturn
