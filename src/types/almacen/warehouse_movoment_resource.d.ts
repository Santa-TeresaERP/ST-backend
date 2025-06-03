export interface WarehouseMovomentResourceAttributes {
  id?: string
  warehouse_id: string
  resource_id: string
  movement_type: string
  quantity: number
  movement_date: Date
  observations?: string | null
}
