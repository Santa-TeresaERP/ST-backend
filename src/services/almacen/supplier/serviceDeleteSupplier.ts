import Supplier from '@models/suplier'

const serviceDeleteSupplier = async (id: string) => {
  const supplier = await Supplier.findByPk(id)
  if (!supplier) {
    return { error: 'Proveedor no encontrado' }
  }

  await supplier.destroy()
  return { message: 'Proveedor eliminado exitosamente' }
}

export default serviceDeleteSupplier
