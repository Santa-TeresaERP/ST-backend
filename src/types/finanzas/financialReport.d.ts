/**
 * Representa la estructura base de un registro en la tabla `FINANCIAL_REPORT`.
 */
export interface FinancialReportAttributes {
  id?: string
  start_date: Date
  end_date?: Date | null
  total_income: number | string
  total_expenses: number | string
  net_profit: number | string
  status: 'activo' | 'inactivo' | 'finalizado' | 'proceso' 
  observations?: string | null
  createdAt?: Date
  updatedAt?: Date
}