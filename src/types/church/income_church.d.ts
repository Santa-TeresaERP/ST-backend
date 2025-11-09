/**
 * Representa la estructura base de un registro en la tabla 'INCOME_CHURCH'
 */
export interface IncomeChurchAttributes {
  id?: string
  name: string
  type: 'donativo' | 'limosna' | 'limosna yape' | 'otros' | string
  price: number
  status: boolean
  date: string
  idChurch: string
  createdAt?: Date
  updatedAt?: Date
}
