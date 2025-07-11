import Resource from '@models/resource'
import { ResourceAttributes } from '@type/almacen/resource'
import { resourceValidation } from 'src/schemas/almacen/resourceSchema'

const serviceUpdateResource = async (id: string, body: ResourceAttributes) => {
  const validation = resourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, observation } = validation.data

  const resource = await Resource.findByPk(id)
  if (!resource) {
    return { error: 'El recurso no existe' }
  }

  await resource.update({
    name,
    observation,
  })
  return resource
}

export default serviceUpdateResource
