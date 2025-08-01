import { z } from 'zod';

/**
 * Schema para validar los datos necesarios para INICIAR la creación de un reporte.
 * El usuario solo proporciona el rango de fechas y opcionalmente una observación.
 * Los totales y el beneficio neto son calculados por el backend.
 */
export const createFinancialReportSchema = z.object({
  start_date: z.coerce.date({
    required_error: 'La fecha de inicio es obligatoria.',
    invalid_type_error: 'La fecha de inicio debe ser una fecha válida.',
  }),
  end_date: z.coerce.date({
    required_error: 'La fecha de fin es obligatoria.',
    invalid_type_error: 'La fecha de fin debe ser una fecha válida.',
  }),
  observations: z.string().max(500, 'Las observaciones no pueden exceder los 500 caracteres.').optional().nullable(),
});

/**
 * Schema para validar la ACTUALIZACIÓN de un reporte.
 * Generalmente, solo las observaciones se pueden modificar después de que un reporte ha sido generado.
 */
export const updateFinancialReportSchema = z.object({
  observations: z.string().max(500, 'Las observaciones no pueden exceder los 500 caracteres.').optional().nullable(),
});

// --- FUNCIONES DE VALIDACIÓN EXPORTADAS ---

export const createFinancialReportValidation = (data: unknown) => {
  return createFinancialReportSchema.safeParse(data);
};

export const updateFinancialReportValidation = (data: unknown) => {
  return updateFinancialReportSchema.safeParse(data);
};