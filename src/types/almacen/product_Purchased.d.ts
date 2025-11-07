export interface ProductPurchasedAttributes {
  id: string
  name: string
  description?: string | null
  status: boolean
  createdAt: Date
  updatedAt: Date
}

// Payload para crear un nuevo producto comprado (lo que se espera del body de la API)
export type CreateProductPurchasedPayload = Omit<
  ProductPurchasedAttributes,
  'id' | 'status' | 'createdAt' | 'updatedAt'
>

// Payload para actualizar (todos los campos son opcionales)
export type UpdateProductPurchasedPayload =
  Partial<CreateProductPurchasedPayload>
