import WarehouseResourceModel from '@models/warehouseResource'

const GetWarehouseResourceById = async (id: string) => {
  try {
    const resource = await WarehouseResourceModel.findById(id) // Suponiendo que usas Mongoose
    if (resource === null || resource === undefined) {
      throw new Error('WarehouseResource not found')
    }
    return resource
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error fetching WarehouseResource by ID: ${error.message}`,
      )
    } else {
      throw new Error('Error fetching WarehouseResource by ID: Unknown error')
    }
  }
}

export default GetWarehouseResourceById
