import Entrance from '@models/entrance'
import { entranceAttributes } from '@type/museo/entrance'
import { entranceValidation } from 'src/schemas/museo/entrance'
const serviceUpdateEntrance = async (id: string, body: entranceAttributes) => {
  const validation = entranceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const entrance = await Entrance.findByPk(id)
  if (!entrance) return { error: 'Entrada no encontrada' }

  await entrance.update(validation.data)
  return entrance
}

export default serviceUpdateEntrance
