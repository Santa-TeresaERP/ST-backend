import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import Recipe from '@models/recipe'
import BuysResource from '@models/buysResource'

const serviceCreateProduction = async (body: productionAttributes) => {
  const validation = productionValidation(body)
  if (!validation.success) return { error: validation.error.errors }

  const { productId, quantityProduced, productionDate, observation, plant_id } =
    validation.data

  const product = await Product.findByPk(productId)
  if (!product) return { error: 'El producto no existe' }

  const plant = await PlantProduction.findByPk(plant_id)
  if (!plant) return { error: 'La planta no existe' }

  const newProduction = await Production.create({
    productId,
    quantityProduced,
    productionDate,
    observation: observation ?? '',
    plant_id,
  })

  // Obtener la receta del producto
  const recipeItems = await Recipe.findAll({ where: { productId } })

  for (const item of recipeItems) {
    const { resourceId, quantity } = item

    // Calcular la cantidad total requerida para la producción
    const totalRequired = quantity * quantityProduced

    // Obtener los recursos disponibles en BuysResource
    const buysResources = await BuysResource.findAll({
      where: { resource_id: resourceId },
      order: [['entry_date', 'ASC']], // Usar FIFO para consumir recursos
    })

    let remainingRequired = totalRequired

    for (const buy of buysResources) {
      if (remainingRequired <= 0) break

      if (buy.quantity >= remainingRequired) {
        // Resta directamente del recurso
        await buy.update({ quantity: buy.quantity - remainingRequired })
        remainingRequired = 0
      } else {
        // Consume todo el recurso y continúa con el siguiente
        remainingRequired -= buy.quantity
        await buy.update({ quantity: 0 })
      }
    }

    if (remainingRequired > 0) {
      return {
        error: `No hay suficiente cantidad del recurso ${resourceId} para la producción.`,
      }
    }
  }

  const datosFinales = {
    id: newProduction.id,
    producto: product.name,
    cantidad_producida: quantityProduced,
    fecha_produccion: productionDate,
    observacion: observation,
    planta: plant.plant_name,
  }

  console.log('📄 Datos de la producción creada:', datosFinales)
  return datosFinales
}

export default serviceCreateProduction
