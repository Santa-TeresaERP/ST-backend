import Entrance from '@models/entrance'

const serviceDeleteEntrance = async (id: string) => {
  const entrance = await Entrance.findByPk(id)
  if (!entrance) return { error: 'Entrada no encontrada' }

  await entrance.destroy()
  return { message: 'Entrada eliminada correctamente' }
}

export default serviceDeleteEntrance
