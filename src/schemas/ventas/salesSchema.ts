import { salesAttributes } from '@type/ventas/sale'
import { z } from 'zod'

// Definir el esquema de validación para el modelo de ventas
const salesSchema = z.object({
  id: z.string().uuid('El ID debe ser un UUID válido').optional(), // El ID es opcional porque se genera automáticamente
  income_date: z.string().nonempty('La fecha de ingreso no puede estar vacía'), // Validar que la fecha no esté vacía
  store_id: z.string().uuid('El ID de la tienda debe ser un UUID válido'), // Validar que el ID de la tienda sea un UUID
  total_income: z
    .number()
    .positive('El ingreso total debe ser un número positivo'), // Validar que el ingreso total sea positivo
  observations: z
    .string()
    .nullable()
    .refine((val) => {
      if (val && /<script|<\/script|SELECT|DROP|INSERT|--/i.test(val)) {
        return false
      }
      return true
    }, 'Las observaciones contienen caracteres no permitidos o posibles inyecciones'), // Validar observaciones contra posibles inyecciones
  createdAt: z.date().optional(), // La fecha de creación es opcional
  updatedAt: z.date().optional(), // La fecha de actualización es opcional
})

// Función para validar los datos usando el esquema
export const saleValidation = (data: salesAttributes) =>
  salesSchema.safeParse(data)
