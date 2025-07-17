import Store from '@models/store'
import { store as StoreAttributes } from '@type/ventas/store'
import { storeValidation } from 'src/schemas/ventas/storeSchema'

const serviceUpdateStore = async (
  id: string,
  body: Partial<StoreAttributes>,
) => {
  const validation = storeValidation({ ...body } as StoreAttributes)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const storeToUpdate = await Store.findByPk(id)

  if (!storeToUpdate) {
    return null
  }
  await storeToUpdate.update(body)
  const updatedStore = await Store.findByPk(id)
  return updatedStore
}

export default serviceUpdateStore
