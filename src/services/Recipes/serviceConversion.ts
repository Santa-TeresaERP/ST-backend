import { ResourceAttributes } from '@type/almacen/resource'

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

const serviceConversion = async (body: ResourceAttributes) => {
  try {
    const { type_unit, entry_quantity } = body

    const grams = convertToGrams(type_unit, entry_quantity)
    console.log(`Cantidad en gramos: ${grams}`)

    const originalQuantity = convertFromGrams(type_unit, grams)
    console.log(`Cantidad en ${type_unit}: ${originalQuantity}`)

    return { grams, originalQuantity }
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export default serviceConversion
