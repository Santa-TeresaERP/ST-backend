import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'

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
