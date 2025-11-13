import Church from '@models/church'

const serviceGetChurchAll = async () => {
  const churches = await Church.findAll()
  return churches
}

export default serviceGetChurchAll
