import WarehouseResource from '@models/buysResource'
import { buysResourceValidation } from 'src/schemas/almacen/BuysResourceSchema'
import { buysResourceAttributes } from '@type/almacen/buys_resource'

const serviceUpdateWarehouseResource = async (
  id: string,
  body: Partial<buysResourceAttributes>,
) => {
  const validation = buysResourceValidation({
    ...body,
    id,
  } as buysResourceAttributes)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  try {
    const existing = await WarehouseResource.findByPk(id)

    if (!existing) {
      return { error: 'Recurso de almacén no encontrado' }
    }

    await existing.update(validation.data)
    return existing
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al actualizar el recurso de almacén',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al actualizar el recurso de almacén' }
  }
}

export default serviceUpdateWarehouseResource
