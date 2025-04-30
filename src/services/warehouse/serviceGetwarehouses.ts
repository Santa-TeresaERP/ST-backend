import warehouses from '@models/warehouse'

const serviceGetwarehouses = async () => {
  const warehouse = await warehouses.findAll()
  return warehouse
}

export default serviceGetwarehouses
