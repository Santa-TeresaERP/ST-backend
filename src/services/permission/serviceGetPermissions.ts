import Permissions from '../../models/permissions'

const serviceGetPermissions = async () => {
  try {
    console.log('🔍 Obteniendo todos los permisos')

    const permissions = await Permissions.findAll({
      include: ['Module'],
    })

    console.log(`✅ Se encontraron ${permissions.length} permisos`)

    return permissions
  } catch (error) {
    console.error('❌ Error al obtener permisos:', error)
    throw error
  }
}

export default serviceGetPermissions
