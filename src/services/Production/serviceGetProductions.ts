import Production from '@models/production'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'

const serviceGetProductions = async () => {
  const productions = await Production.findAll({
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
    order: [['productionDate', 'DESC']],
  })

  return productions
}

export default serviceGetProductions
