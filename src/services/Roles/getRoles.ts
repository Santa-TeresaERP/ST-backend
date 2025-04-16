import Roles from '@models/roles'
import Permissions from '@models/permissions'

const getRoles = async () => {
  const roles = await Roles.findAll({
    include: [
      {
        model: Permissions,
        through: { attributes: [] },
        include: ['Module'],
      },
    ],
  })
  return roles
}

export default getRoles
