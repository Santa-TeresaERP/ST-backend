import Church from '@models/church'

const serviceDeleteChurch = async (id: string) => {
  const church = await Church.findByPk(id)
  if (!church) return null

  await church.update({ status: false })
  return { message: 'Iglesia eliminada correctamente' }
}

export default serviceDeleteChurch
