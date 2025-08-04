import Permissions from '../../models/permissions'

const serviceGetPermissions = async () => {
  try {
    console.log('🔍 Obteniendo todos los permisos')

    const permissions = await Permissions.findAll({
      include: ['Module'],
    })

    console.log(`✅ Se encontraron ${permissions.length} permisos`)

    return {
      success: true,
      data: permissions,
      message: 'Permisos obtenidos correctamente',
    }
  } catch (error) {
    console.error('❌ Error al obtener permisos:', error)
    return {
      success: false,
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : String(error),
    }
  }
}

export default serviceGetPermissions
