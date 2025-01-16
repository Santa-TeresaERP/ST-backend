export interface productionAttributes {
  id?: string
  productId: string
  quantityProduced: number
  quantityUsed: string
  productionDate: string
  observation: string
  createdAt?: Date
  updatedAt?: Date
}

export interface resourceProductionAttributes {
  productionId: string
  resourceId: string
  createdAt?: Date
  updatedAt?: Date
}
