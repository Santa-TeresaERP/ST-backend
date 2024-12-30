import User from '@models/user'
import bcrypt from 'bcryptjs' 
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@environments'

const createAdmin = async () => {
  try {
    const email = ADMIN_EMAIL!
    const password = ADMIN_PASSWORD!
    const salt = await bcrypt.genSalt(10) 
    const hashedPassword = await bcrypt.hash(password, salt) 

    const [created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: 'Admin',
        phonenumber: '0000000000',
        dni: '12345678',
        email,
        password: hashedPassword,
      },
    })

    if (created) {
      console.log('Admin user created')
    } else {
      console.log('Admin user already exists')
    }
  } catch (err) {
    console.error('Error creating admin:', err)
  }
}

export default createAdmin