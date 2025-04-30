import Supplier from '@models/suplier'

const serviceGetSupplier = async (id: string) => {
  const supplier = await Supplier.findByPk(id)
  return supplier ?? { error: 'Proveedor no encontrado' }
}

export default serviceGetSupplier
