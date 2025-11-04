export interface ProductAttributes {
  id?: string
  name: string
  category_id: string
  price: number
  description: string
  imagen_url: string
  producible?: boolean; // Nuevo campo agregado
  createdAt?: Date
  updatedAt?: Date
}
