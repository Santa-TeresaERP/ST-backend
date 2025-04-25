import Resource from '@models/resource'

const serviceDeleteResource = async (id: string) => {
  const resource = await Resource.findByPk(id)

  if (!resource) {
    return { error: 'El rol no existe' }
  }

  await resource.destroy()
  return { message: 'Rol eliminado correctamente' }
}

export default serviceDeleteResource
