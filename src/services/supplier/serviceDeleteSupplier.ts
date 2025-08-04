import Supplier from '@models/suplier'

const serviceDeleteSupplier = async (id: string) => {
  try {
    const supplier = await Supplier.findByPk(id)
    if (!supplier) {
      return { error: 'Proveedor no encontrado' }
    }

    // Cambiar el status a false en lugar de eliminar
    supplier.status = !supplier.status // Alternar el estado
    await supplier.save()

    console.log(
      `Estado del proveedor "${supplier.suplier_name}" cambiado a: ${supplier.status ? 'activo' : 'inactivo'}`,
    )

    return supplier
  } catch (error) {
    return { error: 'Error al desactivar proveedor' }
  }
}

export default serviceDeleteSupplier
