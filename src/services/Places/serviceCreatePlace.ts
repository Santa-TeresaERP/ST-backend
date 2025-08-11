import Place from '@models/places'
import { PlaceAttributes } from '@type/alquiler/places'
import { placeValidation } from '../../schemas/alquiler/placeSchema'

const serviceCreatePlace = async (body: PlaceAttributes) => {
  const validation = placeValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const { location_id, name, area, imagen_url } = validation.data
  const newPlace = await Place.create({
    location_id,
    name,
    area,
    imagen_url: imagen_url ?? '',
  })
  return newPlace
}

export default serviceCreatePlace
