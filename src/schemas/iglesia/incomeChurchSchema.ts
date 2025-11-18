import { IncomeChurchAttributes } from '@type/church/income_church'
import { z } from 'zod'

export const createIncomeChurchSchema = z.object({
  // Name: Requerido
  name: z
    .string({
      required_error: 'El nombre del ingreso es obligatorio.',
      invalid_type_error: 'El nombre debe ser una cadena de texto.',
    })
    .min(3, 'El nombre debe tener al menos 3 caracteres.'),

  // Type: Requerido, restringido a los valores de la tabla
  type: z.enum(['donativo', 'limosna', 'limosna yape', 'otros'], {
    required_error: 'El tipo de ingreso es obligatorio.',
    invalid_type_error:
      'El tipo de ingreso debe ser "donativo", "limosna", "limosna yape" o "otros".',
  }),

  // Price: Requerido, debe ser un número positivo (double/decimal)
  price: z
    .number({
      required_error: 'El precio o monto es obligatorio.',
      invalid_type_error: 'El precio debe ser un número.',
    })
    .positive('El precio debe ser un número positivo.'),

  // Date: Requerido (String con formato YYYY-MM-DD, según tu modelo)
  date: z
    .string({
      required_error: 'La fecha es obligatoria.',
      invalid_type_error: 'La fecha debe ser una cadena de texto.',
    })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'El formato de la fecha debe ser AAAA-MM-DD.',
    ),

  // idChurch (FK): Requerido
  idChurch: z
    .string({
      required_error: 'El ID de la Iglesia es obligatorio.',
    })
    .uuid('El ID de la Iglesia debe ser un formato UUID válido.'),
})

export const updateIncomeChurchSchema = z
  .object({
    // Todos los campos de creación son opcionales
    name: createIncomeChurchSchema.shape.name.optional(),
    type: createIncomeChurchSchema.shape.type.optional(),
    price: createIncomeChurchSchema.shape.price.optional(),
    date: createIncomeChurchSchema.shape.date.optional(),
    idChurch: createIncomeChurchSchema.shape.idChurch.optional(),

    // Status: Opcional, pero si se envía debe ser un booleano (para reactivar o "soft-delete")
    status: z
      .boolean({
        invalid_type_error:
          'El status debe ser un valor booleano (true/false).',
      })
      .optional(),

    // Se requiere al menos un campo para actualizar
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe proporcionar al menos un campo para actualizar.',
  })

// --- FUNCIONES DE VALIDACIÓN EXPORTADAS ---

/**
 * Función de validación para la creación de IncomeChurch.
 * @param data - Los datos de entrada.
 * @returns El resultado del parseo seguro de Zod.
 */
export const createIncomeChurchValidation = (data: IncomeChurchAttributes) => {
  return createIncomeChurchSchema.safeParse(data)
}

/**
 * Función de validación para la actualización de IncomeChurch.
 * @param data - Los datos de entrada.
 * @returns El resultado del parseo seguro de Zod.
 */
export const updateIncomeChurchValidation = (data: IncomeChurchAttributes) => {
  return updateIncomeChurchSchema.safeParse(data)
}
