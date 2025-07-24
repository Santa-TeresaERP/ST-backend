import Permissions from '../../models/permissions'

const serviceDeletePermission = async (id: string) => {
  try {
    console.log(`🔍 Eliminando permiso con ID: ${id}`)

    const permission = await Permissions.findByPk(id)

    if (!permission) {
      return { error: 'El permiso no existe' }
    }

    await permission.destroy()

    console.log(`✅ Permiso ${id} eliminado correctamente`)

    return { message: 'Permiso eliminado correctamente' }
  } catch (error) {
    console.error('❌ Error al eliminar permiso:', error)
    return { error: 'Error interno del servidor' }
  }
}

export default serviceDeletePermission
