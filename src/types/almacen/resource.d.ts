export interface ResourceAttributes {
  id?: string
  name: string
  unit_price: string
  type_unit: string
  total_cost: number
  supplier_id?: string
  observation?: string
  purchase_date: Date
  createdAt?: Date
  updatedAt?: Date
}
