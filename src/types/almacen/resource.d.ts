export interface ResourceAttributes {
  resource_id?: string
  name: string
  entry_quantity: number
  total_cost: number
  supplier_id: string
  purchase_date: Date
  observation?: string
  createdAt?: Date
  updatedAt?: Date
}
