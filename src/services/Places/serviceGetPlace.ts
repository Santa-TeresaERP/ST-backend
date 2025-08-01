import Place from '@models/places'

const serviceGetPlace = async (id: string) => {
  const place = await Place.findByPk(id)
  if (!place) {
    return { error: 'Place not found' }
  }
  return place
}

export default serviceGetPlace
