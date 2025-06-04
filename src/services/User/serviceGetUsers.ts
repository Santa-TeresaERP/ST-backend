import Roles from '@models/roles'
import User from '@models/user'
import Permissions from '@models/permissions'

const serviceGetUsers = async (): Promise<User[]> => {
  const users = await User.findAll({
    where: { status: true },
    include: [
      {
        model: Roles,
        include: [
          {
            model: Permissions,
          },
        ],
      },
    ],
  })
  return users
}

export default serviceGetUsers
