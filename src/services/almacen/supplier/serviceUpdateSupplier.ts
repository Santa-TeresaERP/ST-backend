import Supplier from '@models/suplier'
import { SuplierAttributes } from '@type/almacen/supplier'
import { supplierUpdateValidation } from 'src/schemas/almacen/supplier'

const serviceUpdateSupplier = async (
  id: string,
  body: Partial<SuplierAttributes>,
) => {
  const validation = supplierUpdateValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const supplier = await Supplier.findByPk(id)
  if (!supplier) {
    return { error: 'Proveedor no encontrado' }
  }

  await supplier.update(validation.data)
  return supplier
}

export default serviceUpdateSupplier
