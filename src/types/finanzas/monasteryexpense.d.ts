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

export interface CreateMonasteryExpenseDTO {
  expense_date: Date | string
  description: string
  amount: number
  category: string
  payment_method: string
  receipt_number?: string | null
  notes?: string | null
}

export interface UpdateMonasteryExpenseDTO
  extends Partial<
    Omit<
      CreateMonasteryExpenseDTO,
      'expense_date' | 'description' | 'amount' | 'category' | 'payment_method'
    >
  > {
  expense_date?: Date | string
  description?: string
  amount?: number
  category?: string
  payment_method?: string
}

export interface MonasteryExpenseFilters {
  startDate?: Date | string
  endDate?: Date | string
  category?: string
  payment_method?: string
  minAmount?: number
  maxAmount?: number
}
