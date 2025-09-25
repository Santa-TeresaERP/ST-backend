export interface MonasteryExpense {
  id: string
  expense_date: Date
  description: string
  amount: number
  category: string
  payment_method: string
  receipt_number?: string | null
  notes?: string | null
  created_at: Date
  updated_at: Date
}
