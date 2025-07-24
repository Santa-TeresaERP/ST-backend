// Este archivo se mantiene por compatibilidad pero ahora usa los controladores modulares
import permissionController from './permission'

// Exportar controladores individuales para compatibilidad
export const createPermissionController =
  permissionController.createPermissionController
export const createMultiplePermissionsController =
  permissionController.createMultiplePermissionsController
export const getPermissionsController =
  permissionController.getPermissionsController
export const updatePermissionController =
  permissionController.updatePermissionController
export const deletePermissionController =
  permissionController.deletePermissionController
