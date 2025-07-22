export interface returnsAttributes {
  id?: string
  productId: string
  salesId: string
  reason: string
  observations?: string
  quantity: number // nuevo campo ingresado manualmente
  price: number // nuevo campo calculado según productId
  createdAt?: Date
  updatedAt?: Date
}
