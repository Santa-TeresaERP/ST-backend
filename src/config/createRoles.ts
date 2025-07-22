import useRoles from '@services/Roles'

const createRoles = async () => {
  try {
    const roles = [
      {
        name: 'User',
        description: 'Regular user with limited access',
        status: true,
      },
      {
        name: 'Manager',
        description: 'Oversees user activities and reports',
        status: true,
      },
      {
        name: 'Guest',
        description: 'Readonly access to certain sections',
        status: true,
      },
    ]

    const createdRoles = await Promise.all(
      roles.map((role) => useRoles.createRole(role)),
    )

    createdRoles.forEach((result, idx) => {
      if ('error' in result) {
        console.log(`Error creating role "${roles[idx].name}":`, result.error)
      } else {
        console.log(`Role "${result.name}" created or already exists.`)
      }
    })

    return createdRoles.filter((result) => !('error' in result))
  } catch (err) {
    console.error('Error creating roles:', err)
    throw err
  }
}

export default createRoles
