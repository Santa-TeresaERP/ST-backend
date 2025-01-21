export interface PaymentAttributes {
  id?: string
  rental_id: string
  amount: number
  payment_date: Date
  status: string
  createdAt?: Date
  updatedAt?: Date
}
