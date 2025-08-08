import Place from '@models/places'

const serviceDeletePlace = async (id: string) => {
  const place = await Place.findByPk(id)
  if (!place) {
    return { error: 'Place not found' }
  }
  await place.destroy()
  return { message: 'Place deleted successfully' }
}

export default serviceDeletePlace
