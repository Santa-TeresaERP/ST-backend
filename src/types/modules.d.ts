export interface ModulesAttributes {
  id?: string
  name: string
}

export interface AccessesAttributes {
  id?: string
  moduleId: string
  name: string
}

export interface AccessesPermissionAttributes {
  id?: string
  userId: string
  accessId: string
  value: boolean
}

export interface RolesAttributes {
  id: string
  name: string
  description: string
}

export interface PermissionsAttributes {
  id: string
  moduleId: string
  canRead: boolean
  canWrite: boolean
  canEdit: boolean
  canDelete: boolean
}

export interface RolesPermissionsAttributes {
  roleId: string
  permissionId: string
}

export interface CustomerAttributes {
  id: string
  full_name: string
  dni: string
  phone: string
  email: string
}

export interface LocationAttributes {
  id: string
  name: string
  address: string
  capacity: number
  status: string
}

export interface RentalAttributes {
  id: string
  customer_id: string
  location_id: string
  user_id: string
  event_description: string
  start_date: Date
  end_date: Date
  price: string
  status: string
}

export interface PaymentAttributes {
  id: string
  rental_id: string
  amount: number
  payment_date: Date
  status: string
}
