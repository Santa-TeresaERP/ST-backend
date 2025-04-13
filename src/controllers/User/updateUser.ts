import { Request, Response } from 'express'
import { serviceUpdateUser } from '@services/User/serviceUpdateUser'
import { HttpError } from '@errors/http'

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await serviceUpdateUser(req.params.id, req.body)
    if (!user) throw new HttpError('Error to updating user', 400)

    res.json({ message: 'User updated', user })
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
