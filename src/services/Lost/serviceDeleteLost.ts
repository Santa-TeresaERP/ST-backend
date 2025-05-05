import Lost from '@models/lost'

export default async function deleteLost(id: string) {
  try {
    const lost = await Lost.findByPk(id)
    if (!lost) {
      throw new Error('Registro de pérdida no encontrado')
    }

    await lost.destroy()
    return { message: 'Registro de pérdida eliminado correctamente' }
  } catch (error) {
    throw new Error(
      `Error al eliminar registro de pérdida: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
