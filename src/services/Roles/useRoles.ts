import Roles from '@models/roles'
import { RolesAttributes } from '@type/user/roles'
import { rolesValidation } from 'src/schemas/user/rolesSchema'
import Permissions from '@models/permissions'

class useRoles {
  // Crear un rol
  static async createRole(body: RolesAttributes) {
    const validation = rolesValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors } // Errores de validación
    }

    const { name, description } = validation.data

    const existingRole = await Roles.findOne({ where: { name } })
    if (existingRole) {
      return { error: 'El rol ya existe' }
    }

    const newRole = await Roles.create({ name, description })
    return newRole
  }

  // Obtener todos los roles
  static async getRoles() {
    const roles = await Roles.findAll({
      include: [
        {
          model: Permissions,
          through: { attributes: [] }, // Excluir atributos de la tabla intermedia
          include: ['Module'], // Incluir el módulo relacionado
        },
      ],
    })
    return roles
  }

  static async getRole(id: string) {
    const role = await Roles.findByPk(id, {
      include: [
        {
          model: Permissions,
          through: { attributes: [] },
          include: ['Module'],
        },
      ],
    })

    if (!role) {
      return { error: 'El rol no existe' }
    }

    return role
  }

  // Actualizar un rol
  static async updateRole(id: string, body: RolesAttributes) {
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

  // Eliminar un rol
  static async deleteRole(id: string) {
    const role = await Roles.findByPk(id)

    if (!role) {
      return { error: 'El rol no existe' }
    }

    await role.destroy()
    return { message: 'Rol eliminado correctamente' }
  }
}

export default useRoles
