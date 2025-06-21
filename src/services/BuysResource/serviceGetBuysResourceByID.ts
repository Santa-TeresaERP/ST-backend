import BuysResource from '@models/buysResource'

const serviceGetBuysResourceById = async (id: string) => {
  try {
    const resource = await BuysResource.findById(id) // Suponiendo que usas Mongoose
    if (resource === null || resource === undefined) {
      throw new Error('BuysResource not found')
    }
    return resource
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching BuysResource by ID: ${error.message}`)
    } else {
      throw new Error('Error fetching BuysResource by ID: Unknown error')
    }
  }
}

export default serviceGetBuysResourceById
