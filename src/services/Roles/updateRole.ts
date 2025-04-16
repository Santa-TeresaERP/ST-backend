import Roles from '@models/roles'
import { RolesAttributes } from '@type/user/roles'
import { rolesValidation } from 'src/schemas/user/rolesSchema'

const updateRole = async (id: string, body: RolesAttributes) => {
  const validation = rolesValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, description } = validation.data

  const role = await Roles.findByPk(id)
  if (!role) {
    return { error: 'El rol no existe' }
  }

  await role.update({ name, description })
  return role
}

export default updateRole
