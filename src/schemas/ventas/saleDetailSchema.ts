import { SaleDetailAttributes } from '@type/ventas/saleDetail'
import { z } from 'zod'

const saleDetailSchema = z.object({
  saleId: z.string().uuid('El ID de la venta no es válido'),
  productId: z.string().uuid('El ID del producto no es válido'),

  quantity: z
    .number({
      required_error: 'La cantidad es obligatoria',
      invalid_type_error: 'La cantidad debe ser un número',
    })
    .min(1, 'La cantidad debe ser mayor a 0')
    .max(100, 'La cantidad no puede exceder 100'),

  mount: z
    .number({
      required_error: 'El monto es obligatorio',
      invalid_type_error: 'El monto debe ser un número',
    })
    .nonnegative('El monto no puede ser negativo'),
})

export const saleDetailValidation = (data: SaleDetailAttributes) =>
  saleDetailSchema.safeParse(data)
