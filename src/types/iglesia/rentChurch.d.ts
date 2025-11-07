export interface RentChurchAttributes {
  id: string
  name: string
  type: 'matrimonio' | 'bautizo' | 'otros' | string
  startTime: string
  endTime: string
  price: number
  status: boolean
  date: string
  idChurch: string | null
  createdAt?: Date
  updatedAt?: Date
}
