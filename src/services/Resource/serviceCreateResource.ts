import Resource from '@models/resource'
import { resourceValidation } from '../../schemas/almacen/resourceSchema'
import { ResourceAttributes } from '@type/almacen/resource'

const serviceCreateResource = async (body: ResourceAttributes) => {
  const validation = resourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, observation } = validation.data

  const existing = await Resource.findOne({ where: { name } })
  if (existing) {
    return { error: 'El recurso ya existe' }
  }

  const newResource = await Resource.create({
    name,
    observation,
  }).catch((error) => {
    return { error: 'Error al crear el recurso', details: error.message }
  })

  return newResource
}

export default serviceCreateResource
