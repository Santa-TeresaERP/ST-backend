import { z } from 'zod'
import { buysProductAttributes } from '@type/almacen/buys_product'

export const buysProductSchema = z.object({
  warehouse_id: z
    .string()
    .uuid('El ID del almacén debe ser un UUID válido')
    .nonempty('El ID del almacén no puede estar vacío'),

  product_id: z
    .string()
    .uuid('El ID del producto debe ser un UUID válido')
    .nonempty('El ID del producto no puede estar vacío'),

  quantity: z.number({ invalid_type_error: 'La cantidad debe ser un número' }),

  unit_price: z.number({
    invalid_type_error: 'El precio unitario debe ser un número',
  }),

  total_cost: z.number({
    invalid_type_error: 'El costo total debe ser un número',
  }),

  supplier_id: z.string().uuid('El ID del proveedor debe ser un UUID válido'),

  entry_date: z.coerce.date({
    invalid_type_error: 'La fecha de entrada debe ser válida',
  }),
  status: z.boolean().optional().default(true),
})

export const buysProductValidation = (data: buysProductAttributes) =>
  buysProductSchema.safeParse(data)

// Schema para actualizaciones parciales
export const buysProductUpdateSchema = buysProductSchema.partial()

export const buysProductUpdateValidation = (
  data: Partial<buysProductAttributes>,
) => buysProductUpdateSchema.safeParse(data)

export type BuysProductInput = z.infer<typeof buysProductSchema>
