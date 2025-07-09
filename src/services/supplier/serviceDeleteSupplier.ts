import Supplier from '@models/suplier'

const serviceDeleteSupplier = async (id: string) => {
  const supplier = await Supplier.findByPk(id)
  if (!supplier) {
    return { error: 'Proveedor no encontrado' }
  }

  // Cambiar el status a false en lugar de eliminar
  supplier.status = false
  await supplier.save()

  return { message: 'Proveedor desactivado exitosamente' }
}

export default serviceDeleteSupplier
