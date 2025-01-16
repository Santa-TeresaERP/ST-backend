export interface InventoryAdjustmentAttributes {
  id?: string
  product_id: string
  adjustment_type: string
  quantity: number
  observations?: string
  createdAt?: Date
  updatedAt?: Date
}
