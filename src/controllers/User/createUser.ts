import { Response } from 'express'
import { AuthRequest as Request } from '@type/user/auth'
import { HttpError } from '@errors/http'
import useUser from '@services/user/index'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await useUser.serviceCreateUser(req.body)
    if (!user) throw new HttpError('User alredy exists', 400)

    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default createUser
