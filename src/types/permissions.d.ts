export interface PermissionsAttributes {
  id?: string
  moduleId: string
  canRead: boolean
  canWrite: boolean
  canEdit: boolean
  canDelete: boolean
}

export interface RolesPermissionsAttributes {
  roleId?: string
  permissionId: string
}
