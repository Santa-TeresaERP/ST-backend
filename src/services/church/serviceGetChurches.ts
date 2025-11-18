import Church from '@models/church'

const serviceGetChurches = async () => {
  const churches = await Church.findAll({ where: { status: true } })
  return churches
}

export default serviceGetChurches
