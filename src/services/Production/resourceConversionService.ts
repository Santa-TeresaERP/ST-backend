/* eslint-disable @typescript-eslint/no-explicit-any */
import Recipe from '@models/recipe'
import WarehouseResource from '@models/warehouseResource'
import Resource from '@models/resource'

interface ResourceDeduction {
  resourceId: string
  resourceName: string
  requiredQuantity: number
  availableQuantity: number
  unit: string
}

interface ConversionResult {
  success: boolean
  message?: string
  deductedResources?: ResourceDeduction[]
}

/**
 * Convierte/descuenta recursos del almacén basado en la receta del producto
 * @param productId - ID del producto a producir
 * @param quantityProduced - Cantidad a producir
 * @returns Resultado de la conversión
 */
export const convertResourcesForProduction = async (
  productId: string,
  quantityProduced: number,
): Promise<ConversionResult> => {
  try {
    console.log(`🔍 Buscando receta para producto: ${productId}`)
    // 1. Obtener la receta del producto
    const recipes = await Recipe.findAll({
      where: { productId },
      include: [
        {
          model: Resource,
          as: 'resource',
          attributes: ['id', 'name', 'type_unit'],
        },
      ],
    })

    console.log(`📋 Recetas encontradas: ${recipes.length}`)

    if (recipes.length === 0) {
      console.log(`❌ No se encontró receta para producto: ${productId}`)
      return {
        success: false,
        message: `No se encontró receta para el producto con ID: ${productId}`,
      }
    }

    const deductedResources: ResourceDeduction[] = []

    // 2. Para cada recurso en la receta
    for (const recipe of recipes) {
      const requiredQuantity = recipe.quantity * quantityProduced

      // 3. Buscar el recurso en el almacén
      const warehouseResource = await WarehouseResource.findOne({
        where: { resource_id: recipe.resourceId },
        include: [
          {
            model: Resource,
            as: 'Resource',
            attributes: ['name', 'type_unit'],
          },
        ],
      })

      if (!warehouseResource) {
        return {
          success: false,
          message: `Recurso ${recipe.resourceId} no encontrado en almacén`,
        }
      }

      // 4. Verificar si hay suficiente stock
      if (warehouseResource.quantity < requiredQuantity) {
        return {
          success: false,
          message: `Stock insuficiente para el recurso. Disponible: ${warehouseResource.quantity}, Requerido: ${requiredQuantity}`,
        }
      }

      // 5. Descontar la cantidad del almacén
      const newQuantity = warehouseResource.quantity - requiredQuantity
      await warehouseResource.update({ quantity: newQuantity })

      // 6. Guardar información del descuento
      deductedResources.push({
        resourceId: recipe.resourceId,
        resourceName: (warehouseResource as any).Resource.name,
        requiredQuantity,
        availableQuantity: warehouseResource.quantity,
        unit: recipe.unit,
      })

      console.log(
        `✅ Descontado ${requiredQuantity} ${recipe.unit} de ${(warehouseResource as any).Resource.name}`,
      )
    }

    return {
      success: true,
      message: 'Recursos descontados exitosamente',
      deductedResources,
    }
  } catch (error) {
    console.error('❌ Error en conversión de recursos:', error)
    return {
      success: false,
      message: `Error interno: ${error instanceof Error ? error.message : 'Error desconocido'}`,
    }
  }
}
