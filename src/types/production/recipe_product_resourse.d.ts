export interface RecipeProductResourceAttributes {
  id: string
  product_id: string
  quantity_required: string
  unit: string
  resource_id?: string
  createdAt?: Date
  updatedAt?: Date
}
