import { resourceAttributes } from '@type/resource'
import { z } from 'zod'

const resourceSchema = z.object({
  name: z
    .string()
    .max(45, 'El nombre del recurso no debe exceder los 45 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo debe contener letras y espacios',
    ),
  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .int('La cantidad debe ser un número entero')
    .min(0, 'La cantidad no puede ser negativa'),
  unitPrice: z
    .number({ invalid_type_error: 'El precio unitario debe ser un número' })
    .positive('El precio unitario debe ser mayor a cero'),
  totalCost: z
    .number({ invalid_type_error: 'El costo total debe ser un número' })
    .positive('El costo total debe ser mayor a cero'),
  supplier: z
    .string()
    .max(45, 'El nombre del proveedor no debe exceder los 45 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre del proveedor solo debe contener letras y espacios',
    ),
  purchaseDate: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'La fecha de compra debe ser válida',
    ),
  observation: z
    .string()
    .max(150, 'La observación no debe exceder los 150 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'La observación solo debe contener letras y espacios',
    ),
})

export const resourceValidation = (data: resourceAttributes) =>
  resourceSchema.safeParse(data)
