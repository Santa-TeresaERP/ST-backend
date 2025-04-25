export interface WarehouseAttributes {
  id?: string
  product_id: string
  quantity: number
  inventory_adjustment_id?: string
  observations?: string
  createdAt?: Date
  updatedAt?: Date
}
