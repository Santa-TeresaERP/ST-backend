import assignAdminPermissions from './assignAdminPermissions'
import User from '@models/user'
import Role from '@models/roles'
import bcrypt from 'bcryptjs'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@environments'

const createAdminUser = async () => {
  try {
    const email = ADMIN_EMAIL!
    const password = ADMIN_PASSWORD!
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const [adminUser, userCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: 'Admin',
        phonenumber: '0000000000',
        dni: '12345678',
        email,
        password: hashedPassword,
      },
    })

    if (userCreated) {
      console.log('Admin user created')
    } else {
      console.log('Admin user already exists')
    }

    // Crear el rol de administrador
    const [adminRole, roleCreated] = await Role.findOrCreate({
      where: { name: 'Admin' },
      defaults: {
        name: 'Admin',
        description: 'Administrator role with full permissions',
      },
    })

    if (roleCreated) {
      console.log('Admin role created')
    } else {
      console.log('Admin role already exists')
    }

    // Asignar el rol de administrador al usuario administrador
    adminUser.roleId = adminRole.id
    await adminUser.save()

    return adminRole.id
  } catch (err) {
    console.error('Error creating admin user:', err)
    throw err
  }
}

const createAdmin = async () => {
  try {
    const adminRoleId = await createAdminUser()
    await assignAdminPermissions(adminRoleId)
  } catch (err) {
    console.error('Error creating admin:', err)
  }
}

export default createAdmin
