import Entrance from '@models/entrance'

const serviceGetEntrances = async () => {
  const entrances = await Entrance.findAll({
    include: ['user', 'type_person', 'sales_channel', 'payment_method_obj'],
    order: [['createdAt', 'DESC']],
  })
  return entrances
}

export default serviceGetEntrances
