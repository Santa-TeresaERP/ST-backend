import Roles from '@models/roles'

const createRoles = async () => {
  try {
    const roles = [
      { name: 'Admin', description: 'Full system access and control' },
      { name: 'User', description: 'Regular user with limited access' },
      { name: 'Manager', description: 'Oversees user activities and reports' },
      { name: 'Guest', description: 'Read-only access to certain sections' },
    ]

    const createdRoles = await Promise.all(
      roles.map((role) =>
        Roles.findOrCreate({
          where: { name: role.name },
          defaults: role,
        }),
      ),
    )

    createdRoles.forEach(([role, created]) => {
      if (created) {
        console.log(`Role "${role.name}" created successfully.`)
      } else {
        console.log(`Role "${role.name}" already exists.`)
      }
    })

    return createdRoles.map(([role]) => role)
  } catch (err) {
    console.error('Error creating roles:', err)
    throw err
  }
}

export default createRoles
