import Roles from '@models/roles'
import User from '@models/user'
import Permissions from '@models/permissions'
import RolesPermissions from '@models/rolesPermissions'

const serviceGetUsers = async (): Promise<User[]> => {
  const users = await User.findAll({
    where: { status: true },
    include: [
      {
        model: Roles,
        include: [
          {
            model: RolesPermissions,
            include: [
              {
                model: Permissions,
              },
            ],
          },
        ],
      },
    ],
  })
  return users
}

export default serviceGetUsers
