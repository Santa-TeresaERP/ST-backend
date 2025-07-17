export interface CashSessionAttributes {
  id?: string
  user_id: string
  store_id: string
  start_amount: number
  end_amount: number
  total_returns: number
  ended_at: Date
}
