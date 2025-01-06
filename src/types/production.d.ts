export interface productionAttributes {
  id?: string
  productId: string
  quantityProduced: number
  quantityUsed: string
  productionDate: string
  observation: string
}

export interface resourceProductionAttributes {
  productionId: string
  resourceId: string
}
