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
