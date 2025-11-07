export interface buysProductAttributes {
  id?: string
  warehouse_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_cost: number
  supplier_id: string
  entry_date: Date
  status?: boolean // Optional, default is true
}
