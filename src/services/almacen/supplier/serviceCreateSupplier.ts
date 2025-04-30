import Supplier from '@models/suplier'
import { SuplierAttributes } from '@type/almacen/supplier'
import { supplierValidation } from 'src/schemas/almacen/supplier'

const serviceCreateSupplier = async (body: SuplierAttributes) => {
  const validation = supplierValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { ruc, suplier_name, contact_name, email, phone, address } =
    validation.data

  const existingSupplier = await Supplier.findOne({ where: { ruc } })
  if (existingSupplier) {
    return { error: 'El proveedor con ese RUC ya existe' }
  }

  const newSupplier = await Supplier.create({
    ruc,
    suplier_name,
    contact_name,
    email,
    phone,
    address,
  })
  return newSupplier
}

export default serviceCreateSupplier
