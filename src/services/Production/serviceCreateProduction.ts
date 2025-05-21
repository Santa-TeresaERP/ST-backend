import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import RecipeProductResource from '@models/recipe_product_resource'
import WarehouseResource from '@models/warehouseResource'

const serviceCreateProduction = async (body: productionAttributes) => {
  const validation = productionValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { productId, quantityProduced, productionDate, observation, plant_id } =
    validation.data

  const existingProduct = await Product.findByPk(productId)
  if (!existingProduct) {
    return { error: 'El producto no existe' }
  }

  const existingPlant = await PlantProduction.findByPk(plant_id)
  if (!existingPlant) {
    return { error: 'La planta no existe' }
  }

  // Crear la producción
  const newProduction = await Production.create({
    productId,
    quantityProduced,
    productionDate,
    observation: observation ?? '',
    plant_id,
  })

  // Obtener los recursos necesarios para el producto desde la tabla de recetas
  const recipes = await RecipeProductResource.findAll({
    where: { product_id: productId },
  })

  for (const recipe of recipes) {
    if (!recipe.resource_id) {
      console.warn(`No se encontró recurso para la receta con ID: ${recipe.id}`)
      continue
    }

    const quantityRequiredPerUnit = Number(recipe.quantity_required)
    if (isNaN(quantityRequiredPerUnit)) {
      console.warn(`Cantidad requerida inválida en receta con ID: ${recipe.id}`)
      continue
    }

    const totalRequired = quantityRequiredPerUnit * quantityProduced

    const warehouseResource = await WarehouseResource.findOne({
      where: { resource_id: recipe.resource_id },
    })

    if (!warehouseResource) {
      // Si no existe en almacén, lo crea con stock negativo
      await WarehouseResource.create({
        warehouse_id: '1', // Ajustar según tu lógica de almacenes
        resource_id: recipe.resource_id,
        quantity: -totalRequired,
        entry_date: new Date(),
      })
    } else {
      // Resta del stock actual, permitiendo negativos
      await warehouseResource.update({
        quantity: warehouseResource.quantity - totalRequired,
      })
    }
  }

  return newProduction
}

export default serviceCreateProduction
