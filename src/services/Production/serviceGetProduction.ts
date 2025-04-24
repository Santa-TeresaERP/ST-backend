import Production from '@models/production'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'

const serviceGetProduction = async (id: string) => {
  const production = await Production.findByPk(id, {
    include: [
      {
        model: Product,
        attributes: ['product_id', 'name', 'description'],
      },
      {
        model: PlantProduction,
        attributes: ['plant_id', 'name', 'location'],
      },
    ],
  })

  if (!production) {
    return { error: 'El registro de producción no existe' }
  }

  return production
}

export default serviceGetProduction
