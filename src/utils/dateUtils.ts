/**
 * Utilidad para validar y corregir fechas, evitando problemas de zona horaria
 * cuando se reciben fechas en formato "YYYY-MM-DD" desde el frontend
 */

export function getValidDate(dateValue: string | Date): Date {
  if (!dateValue) return new Date()

  // Si ya es un objeto Date válido, devolverlo
  if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
    return dateValue
  }

  if (typeof dateValue === 'string') {
    // Si ya tiene la parte de la hora, no concatenar
    const dateStr = dateValue.includes('T')
      ? dateValue
      : dateValue + 'T00:00:00'
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) {
      return d
    }
  }

  // Si todo falla, retorna la fecha actual
  return new Date()
}

/**
 * Convierte una fecha a formato local sin desfase de zona horaria
 */
export function parseLocalDate(dateString: string): Date {
  return getValidDate(dateString)
}

/**
 * Convierte una fecha a string en formato YYYY-MM-DD
 */
export function formatDateToString(date: Date): string {
  return date.toISOString().split('T')[0]
}
