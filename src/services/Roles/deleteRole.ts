import Roles from '@models/roles'

const deleteRole = async (id: string) => {
  const role = await Roles.findByPk(id)

  if (!role) {
    return { error: 'El rol no existe' }
  }

  await role.destroy()
  return { message: 'Rol eliminado correctamente' }
}

export default deleteRole
