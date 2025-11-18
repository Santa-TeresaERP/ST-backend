import Church from '@models/church'

const serviceGetChurch = async (id: string) => {
  const church = await Church.findByPk(id)
  if (!church) return null

  const { ...churchData } = church.toJSON()
  return churchData
}

export default serviceGetChurch
