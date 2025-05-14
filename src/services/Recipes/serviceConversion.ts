import WarehouseResource from '../../models/warehouseResource'
import Resource from '../../models/resource'

// Conversión de unidades a gramos
export const convertToGrams = (typeUnit: string, quantity: number): number => {
  switch (typeUnit.toLowerCase()) {
    case 'kg':
      return quantity * 1000
    case 'l':
      return quantity * 1000
    case 'ml':
      return quantity
    default:
      throw new Error(`Unidad de medida no soportada: ${typeUnit}`)
  }
}

// Conversión de gramos a la unidad original
export const convertFromGrams = (typeUnit: string, grams: number): number => {
  switch (typeUnit.toLowerCase()) {
    case 'kg':
      return grams / 1000
    case 'l':
      return grams / 1000
    case 'ml':
      return grams
    default:
      throw new Error(`Unidad de medida no soportada: ${typeUnit}`)
  }
}

// Función para realizar la conversión a gramos y viceversa usando el ID del recurso
const serviceConversion = async (resourceId: string) => {
  try {
    // Buscar el recurso en el inventario (WarehouseResource)
    const warehouseResource = await WarehouseResource.findOne({
      where: { warehouse_resource_id: resourceId },
    })

    if (!warehouseResource) {
      throw new Error(
        `Recurso con ID ${resourceId} no encontrado en el inventario`,
      )
    }

    // Buscar el recurso relacionado en la tabla Resource
    const resource = await Resource.findOne({
      where: { resource_id: warehouseResource.resource_id },
    })

    if (!resource) {
      throw new Error(
        `Recurso relacionado con ID ${warehouseResource.resource_id} no encontrado`,
      )
    }

    // Extraer los datos necesarios
    const { quantity } = warehouseResource
    const { type_unit } = resource

    // Conversión a gramos
    const grams = convertToGrams(type_unit, quantity)
    console.log(`Cantidad en gramos: ${grams}`)

    // Conversión inversa (de gramos a la unidad original)
    const originalQuantity = convertFromGrams(type_unit, grams)
    console.log(`Cantidad en ${type_unit}: ${originalQuantity}`)

    return { grams, originalQuantity }
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export default serviceConversion
