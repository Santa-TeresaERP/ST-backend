export interface WarehouseMovomentProductAttributes {
  movement_id: string
  warehouse_id: string
  store_id: string
  product_id: string
  movement_type: string
  quantity: number
  movement_date: Date
  observations?: string
  createdAt?: Date
  updatedAt?: Date
}
