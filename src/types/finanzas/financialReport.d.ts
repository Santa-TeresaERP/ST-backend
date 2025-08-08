/**
 * Representa la estructura base de un registro en la tabla `FINANCIAL_REPORT`.
 */
export interface FinancialReportAttributes {
  id?: string // UUID, opcional al crear.
  start_date: Date // TIMESTAMP -> Date
  end_date: Date // TIMESTAMP -> Date
  total_income: number // NUMERIC -> number
  total_expenses: number // NUMERIC -> number
  net_profit: number // NUMERIC -> number
  status: 'activo' | 'inactivo' // ENUM, puede ser 'draft' o 'finalized'
  observations?: string | null // Asumimos TEXTO, opcional y puede ser nulo.
  createdAt?: Date // Añadido por Sequelize
  updatedAt?: Date // Añadido por Sequelize
}
