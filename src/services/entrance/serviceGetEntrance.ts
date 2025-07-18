import Entrance from '@models/entrance'

const serviceGetEntrance = async (id: string) => {
  const entrance = await Entrance.findByPk(id, {
    include: ['user', 'type_person', 'sales_channel', 'payment_method_obj'],
  })

  if (!entrance) return { error: 'Entrada no encontrada' }
  return entrance
}

export default serviceGetEntrance
