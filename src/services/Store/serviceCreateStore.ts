import Store from '@models/store'
import { store as StoreAttributes } from '@type/ventas/store'
import { storeValidation } from 'src/schemas/ventas/storeSchema'

const serviceCreateStore = async (body: StoreAttributes) => {
  const validation = storeValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const { store_name, address, observations } = body
  const store = await Store.create({ store_name, address, observations })
  return store
}

export default serviceCreateStore
