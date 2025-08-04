import createRole from './createRole'
import getRoles from './getRoles'
import getRole from './getRole'
import getRolePermissions from './getRolePermissionsController'
import updateRole from './updateRole'
import deleteRole from './deleteRole'

const rolesController = {
  createRole,
  getRoles,
  getRole,
  getRolePermissions,
  updateRole,
  deleteRole,
}

export default rolesController
