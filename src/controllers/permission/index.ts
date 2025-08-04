import createPermissionController from './createPermissionController'
import createMultiplePermissionsController from './createMultiplePermissionsController'
import getPermissionsController from './getPermissionsController'
import updatePermissionController from './updatePermissionController'
import deletePermissionController from './deletePermissionController'

const permissionController = {
  createPermissionController,
  createMultiplePermissionsController,
  getPermissionsController,
  updatePermissionController,
  deletePermissionController,
}

export default permissionController
