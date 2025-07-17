import Store from '@models/store'

const serviceGetStore = async (id: string) => {
  const store = await Store.findByPk(id)
  return store
}

export default serviceGetStore
