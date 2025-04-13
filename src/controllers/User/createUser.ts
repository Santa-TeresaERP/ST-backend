import { Response } from 'express'
import { AuthRequest as Request } from '@type/user/auth'
import { HttpError } from '@errors/http'
import { serviceCreateUser } from '@services/user/serviceCreateUser'

export async function createUser(req: Request, res: Response) {
  try {
    const user = await serviceCreateUser(req.body)
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
