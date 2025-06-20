import Resource from '@models/resource'
import { ResourceAttributes } from '@type/almacen/resource'
import { resourceValidation } from 'src/schemas/almacen/resourceSchema'

const serviceUpdateResource = async (id: string, body: ResourceAttributes) => {
  const validation = resourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const {
    name,
    unit_price,
    type_unit,
    total_cost,
    supplier_id,
    observation,
    purchase_date,
  } = validation.data

  const resource = await Resource.findByPk(id)
  if (!resource) {
    return { error: 'El recurso no existe' }
  }

  await resource.update({
    name,
    unit_price,
    type_unit,
    total_cost,
    supplier_id,
    observation,
    purchase_date,
  })
  return resource
}

export default serviceUpdateResource
