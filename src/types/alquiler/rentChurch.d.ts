export interface RentChurchAttributes {
  id?: string
  name: string
  type: 'matrimonio' | 'bautizo' | 'otros'
  startTime: string
  endTime: string
  price: number
  status?: boolean
  date: string
  idChurch: string
}
