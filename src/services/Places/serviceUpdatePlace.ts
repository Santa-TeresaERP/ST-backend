import Place from '@models/places'
import { PlaceAttributes } from '@type/alquiler/places'
import { placeValidation } from '../../schemas/alquiler/placeSchema'

const serviceUpdatePlace = async (id: string, body: Partial<PlaceAttributes>) => {
  const validation = placeValidation({ ...body, id } as PlaceAttributes)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const place = await Place.findByPk(id)
  if (!place) {
    return { error: 'Place not found' }
  }
  await place.update(validation.data)
  return place
}

export default serviceUpdatePlace
