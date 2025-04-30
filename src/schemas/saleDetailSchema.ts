import { SaleDetailAttributes } from '@type/ventas/saleDetail'
import { z } from 'zod'

const saleDetailSchema = z.object({
  productId: z.string().uuid('El ID del producto no es válido'),

  quantity: z
    .number({
      required_error: 'La cantidad es obligatoria',
      invalid_type_error: 'La cantidad debe ser un número',
    })
    .min(1, 'La cantidad debe ser mayor a 0')
    .max(100, 'La cantidad no puede exceder 100'),
})

export const saleDetailValidation = (data: SaleDetailAttributes) =>
  saleDetailSchema.safeParse(data)
