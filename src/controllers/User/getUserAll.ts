import { Request, Response } from 'express'
import { serviceGetUsersAll } from '@services/User/serviceGetUserAll'

  // Método para obtener todos los usuarios (activos e inactivos)
  export async function getUsersAll(_req: Request, res: Response) {
    try {
      const users = await serviceGetUsersAll()
      res.json(users)
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error)
      res.status(500).json({ message: 'Error al obtener todos los usuarios' })
    }
  }
