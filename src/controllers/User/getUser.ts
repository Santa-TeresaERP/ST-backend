import { Request, Response } from 'express'
import { serviceGetUser } from '@services/User/serviceGetUser'
import { HttpError } from '@errors/http'
  
export async function getUser(req: Request, res: Response) {
  try {
    const userId = req.params.id
    const user = await serviceGetUser(userId)
    if (!user) throw new HttpError('User not found', 404)
    res.json(user)
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ message: 'Error al obtener usuario' })
  }
}