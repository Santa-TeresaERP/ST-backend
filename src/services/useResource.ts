import resource from '@models/resource'
import { resourceAttributes } from '@type/resource'
import { resourceValidation } from 'src/schemas/resourceSchema'

class useResource {
  static async createResource(body: resourceAttributes) {
    const validation = resourceValidation(body)
    if (!validation.success) {
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

    const newResource = await resource.create({
      name,
      quantity,
      unitPrice,
      totalCost,
      supplier,
      purchaseDate,
      observation,
    })

    return newResource
  }

  static async getResources() {
    const resources = await resource.findAll()
    return resources
  }

  static async deleteResource(id: string) {
    const Resource = await resource.findByPk(id)
    if (!Resource) {
      return null
    }

    await Resource.destroy()
    return { message: 'Recurso eliminado correctamente' }
  }

  static async updateResource(id: string, body: resourceAttributes) {
    const validation = resourceValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const Resource = await resource.findByPk(id)
    if (!Resource) {
      return null
    }

    await Resource.update(body)
    return Resource
  }
}

export default useResource
