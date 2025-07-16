import Store from '@models/store'

const serviceGetStores = async () => {
  const stores = await Store.findAll()
  return stores
}

export default serviceGetStores
