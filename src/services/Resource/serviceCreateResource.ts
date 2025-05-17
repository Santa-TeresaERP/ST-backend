import Resource from '@models/resource'
import { resourceValidation } from 'src/schemas/almacen/resourceSchema'
import { ResourceAttributes } from 'src/types/almacen/resource'

const serviceCreateResource = async (body: ResourceAttributes) => {
  const validation = resourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const {
    name,
    unit_price,
    total_cost,
    type_unit,
    supplier_id,
    purchase_date,
    observation,
  } = validation.data

  const existing = await Resource.findOne({ where: { name } })
  if (existing) {
    return { error: 'El recurso ya existe' }
  }

  const newResource = await Resource.create({
    name,
    unit_price,
    total_cost,
    type_unit,
    supplier_id,
    purchase_date,
    observation,
  }).catch((error) => {
    return { error: 'Error al crear el recurso', details: error.message }
  })

  return newResource
}

export default serviceCreateResource
