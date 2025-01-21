export interface PermissionsAttributes {
  id?: string
  moduleId: string
  canRead: boolean
  canWrite: boolean
  canEdit: boolean
  canDelete: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface RolesPermissionsAttributes {
  roleId?: string
  permissionId: string
  createdAt?: Date
  updatedAt?: Date
}
