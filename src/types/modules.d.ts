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
  descripcion: string
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
