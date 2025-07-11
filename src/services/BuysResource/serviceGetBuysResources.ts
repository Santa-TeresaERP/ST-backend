import BuysResource from '@models/buysResource'
import Resource from '@models/resource'
import Supplier from '@models/suplier'
import Warehouse from '@models/warehouse'

const serviceGetBuysResources = async () => {
  const resources = await BuysResource.findAll({
    include: [
      {
        model: Resource,
        as: 'resource',
        attributes: ['name', 'observation', 'status'],
      },
      {
        model: Warehouse,
        as: 'warehouse',
        attributes: ['name'],
      },
      {
        model: Supplier,
        as: 'supplier',
        attributes: ['suplier_name'],
      },
    ],
  })
  return resources
}

export default serviceGetBuysResources
