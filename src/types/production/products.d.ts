export interface ProductAttributes {
  id?: string
  name: string
  category_id: string
  price: number
  description: string
  imagen_url: string
  status?: boolean // ← Opcional aquí
  createdAt?: Date
  updatedAt?: Date
}
