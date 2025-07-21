import Entrance from '@models/entrance'
import { entranceAttributes } from '@type/museo/entrance'
import { entranceValidation } from 'src/schemas/museo/entrance'

const serviceCreateEntrance = async (body: entranceAttributes) => {
  const validation = entranceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const newEntrance = await Entrance.create(validation.data)
  return newEntrance
}

export default serviceCreateEntrance
