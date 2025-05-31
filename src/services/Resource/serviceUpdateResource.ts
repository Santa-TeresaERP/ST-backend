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
    total_cost,
    type_unit,
    supplier_id,
    purchase_date,
    observation,
  } = validation.data

  const resources = await Resource.findByPk(id)
  if (!resources) {
    return { error: 'El rol no existe' }
  }

  await resources
    .update({
      name,
      unit_price,
      total_cost,
      type_unit,
      supplier_id,
      purchase_date,
      observation,
    })
    .catch((error) => {
      return { error: 'Error al actualizar el recurso', details: error.message }
    })
  return resources
}

export default serviceUpdateResource
