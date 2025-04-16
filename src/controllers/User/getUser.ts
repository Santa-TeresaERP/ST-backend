import { Request, Response } from 'express'
import useUser from '@services/user/index'
import { HttpError } from '@errors/http'

const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const user = await useUser.serviceGetUser(userId)
    if (!user) throw new HttpError('User not found', 404)
    res.json(user)
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ message: 'Error al obtener usuario' })
  }
}

export default getUser
