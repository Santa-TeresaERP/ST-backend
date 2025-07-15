import Store from '@models/store'

const serviceDeleteStore = async (id: string) => {
  const store = await Store.findByPk(id)
  if (!store) {
    return null
  }
  await store.destroy()
  return { message: 'Tienda eliminada correctamente' }
}

export default serviceDeleteStore