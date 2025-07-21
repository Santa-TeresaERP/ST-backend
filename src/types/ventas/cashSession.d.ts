export interface CashSessionAttributes {
  id?: string
  user_id: string
  store_id: string
  start_amount: number
  end_amount?: number // Hacer opcional inicialmente
  total_sales?: number // Total de ventas durante la sesión
  total_returns?: number // Total de pérdidas/devoluciones durante la sesión
  started_at: Date // Fecha de inicio
  ended_at?: Date // Hacer opcional hasta que se cierre
  status: 'open' | 'closed' // Estado de la sesión
}
