export interface plant_productionAttributes {
  id: string
  plant_name: string
  address: string
  warehouse_id: string
  status?: boolean // ← Campo para eliminación lógica
  createdAt?: Date
  updatedAt?: Date
}
