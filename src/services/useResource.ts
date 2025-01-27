import resource from '@models/resource'
import { resourceAttributes } from '@type/resource'
import {
  resourceValidation,
  resourceValidationPartial,
} from 'src/schemas/resourceSchema'

class useResource {
  static async createResource(body: resourceAttributes) {
    console.log('Validando datos para crear recurso:', body)
    const validation = resourceValidation(body)

    if (!validation.success) {
      console.error('Errores de validación:', validation.error.errors)
      return { error: validation.error.errors }
    }

    const {
      name,
      quantity,
      unitPrice,
      totalCost,
      supplier,
      purchaseDate,
      observation,
    } = body

    console.log('Creando recurso con datos validados')
    const newResource = await resource.create({
      name,
      quantity,
      unitPrice,
      totalCost,
      supplier,
      purchaseDate,
      observation,
    })

    console.log('Recurso creado:', newResource.toJSON())
    return newResource
  }

  static async getResources() {
    console.log('Obteniendo todos los recursos')
    const resources = await resource.findAll()
    console.log('Recursos obtenidos:', resources)
    return resources
  }

  static async deleteResource(id: string) {
    console.log('Buscando recurso para eliminar con ID:', id)
    const resourceToDelete = await resource.findByPk(id)
    if (!resourceToDelete) {
      console.log('Recurso no encontrado para eliminar:', id)
      return null
    }

    await resourceToDelete.destroy()
    console.log('Recurso eliminado:', id)
    return { message: 'Recurso eliminado correctamente' }
  }

  static async updateResource(id: string, body: Partial<resourceAttributes>) {
    console.log('Actualizando recurso con ID:', id, 'y datos:', body)

    if (!id) {
      console.error('ID no proporcionado')
      return { error: 'Resource id is required' }
    }

    const validation = resourceValidationPartial(body)
    if (!validation.success) {
      console.error('Errores de validación:', validation.error.errors)
      return { error: validation.error.errors }
    }

    const resourceToUpdate = await resource.findByPk(id)
    if (!resourceToUpdate) {
      console.error('Recurso no encontrado para actualizar:', id)
      return { error: 'Resource not found' }
    }

    await resourceToUpdate.update(body)
    const updatedResource = await resource.findByPk(id)

    console.log('Recurso actualizado:', updatedResource?.toJSON())
    return {
      message: 'Resource updated',
      resource: updatedResource ? updatedResource.toJSON() : {},
    }
  }
}

export default useResource
