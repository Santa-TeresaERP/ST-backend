import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { z } from 'zod'

const warehouseStoreSchema = z.object({
  quantity: z
    .number()
    .int('La cantidad debe ser un número entero')
    .refine((val) => !isNaN(val), 'La cantidad debe ser un número válido'),
})

export const warehouseStoreValidation = (data: warehouseStoreAttributes) =>
  warehouseStoreSchema.safeParse(data)
