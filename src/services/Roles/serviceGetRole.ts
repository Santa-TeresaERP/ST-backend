import Roles from '@models/roles'
import Permissions from '@models/permissions'

const serviceGetRole = async (id: string) => {
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

export default serviceGetRole
