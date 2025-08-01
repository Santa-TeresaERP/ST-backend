import Place from '@models/places'
import { PlaceAttributes } from '@type/alquiler/places'
import { placeValidation } from '../../schemas/alquiler/placeSchema'

const serviceCreatePlace = async (body: PlaceAttributes) => {
  const validation = placeValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const { location_id, name, area } = validation.data
  const newPlace = await Place.create({ location_id, name, area })
  return newPlace
}

export default serviceCreatePlace
