import Place from '@models/places'

const serviceGetPlaces = async () => {
  const places = await Place.findAll()
  return places
}

export default serviceGetPlaces
