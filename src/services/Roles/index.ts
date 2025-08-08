import createRole from './serviceCreateRole'
import getRoles from './serviceGetRoles'
import getRole from './serviceGetRole'
import getRolePermissions from './serviceGetRolePermissions'
import updateRole from './serviceUpdateRole'
import deleteRole from './serviceDeleteRole'

const useRoles = {
  createRole,
  getRoles,
  getRole,
  getRolePermissions,
  updateRole,
  deleteRole,
}

export default useRoles
