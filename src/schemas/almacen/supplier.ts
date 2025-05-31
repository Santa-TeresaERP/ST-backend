import { z } from 'zod'
import { SuplierAttributes } from '@type/almacen/supplier'

export const supplierSchema = z.object({
  id: z
    .string()
    .uuid('El ID del proveedor debe ser un UUID válido')
    .nonempty('El ID del proveedor no puede estar vacío'),

  ruc: z
    .number({ invalid_type_error: 'El RUC debe ser un número' })
    .min(1000000000, 'El RUC debe ser un número de 10 dígitos')
    .max(9999999999, 'El RUC debe ser un número de 10 dígitos'),

  suplier_name: z
    .string()
    .min(1, 'El nombre del proveedor es obligatorio')
    .max(100, 'El nombre del proveedor no debe exceder los 100 caracteres'),

  contact_name: z
    .string()
    .min(1, 'El nombre de contacto es obligatorio')
    .max(100, 'El nombre de contacto no debe exceder los 100 caracteres'),

  email: z
    .string()
    .email('El correo electrónico no es válido')
    .nonempty('El correo electrónico no puede estar vacío'),

  phone: z
    .number({ invalid_type_error: 'El teléfono debe ser un número' })
    .min(100000000, 'El teléfono debe tener al menos 9 dígitos')
    .max(999999999, 'El teléfono no puede exceder los 9 dígitos'),

  address: z
    .string()
    .min(1, 'La dirección es obligatoria')
    .max(200, 'La dirección no debe exceder los 200 caracteres'),

  createdAt: z
    .date({ invalid_type_error: 'La fecha de creación debe ser válida' })
    .optional(),

  updatedAt: z
    .date({ invalid_type_error: 'La fecha de actualización debe ser válida' })
    .optional(),
})

// Validación segura
export const supplierValidation = (data: SuplierAttributes) =>
  supplierSchema.safeParse(data)
export const supplierUpdateSchema = supplierSchema.partial()

export const supplierUpdateValidation = (data: Partial<SuplierAttributes>) =>
  supplierUpdateSchema.safeParse(data)
