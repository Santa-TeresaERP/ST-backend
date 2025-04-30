import Supplier from '@models/suplier'

const serviceGetSuppliers = async () => {
  const suppliers = await Supplier.findAll()
  return suppliers
}

export default serviceGetSuppliers
