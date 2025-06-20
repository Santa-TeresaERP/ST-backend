export interface WarehouseMovomentProductAttributes {
  id?: string
  warehouse_id: string
  store_id?: string | null
  product_id: string
  movement_type: string
  quantity: number
  movement_date: Date
  observations?: string
}
