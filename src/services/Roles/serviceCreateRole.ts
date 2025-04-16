import Roles from '@models/roles'
import { RolesAttributes } from '@type/user/roles'
import { rolesValidation } from 'src/schemas/user/rolesSchema'

const serviceCreateRole = async (body: RolesAttributes) => {
  const validation = rolesValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, description } = validation.data

  const existingRole = await Roles.findOne({ where: { name } })
  if (existingRole) {
    return { error: 'El rol ya existe' }
  }

  const newRole = await Roles.create({ name, description })
  return newRole
}

export default serviceCreateRole
