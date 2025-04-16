import { Request, Response } from 'express'
import useUser from '@services/user/index'

// Método para obtener todos los usuarios (activos e inactivos)
const getUsersAll = async (_req: Request, res: Response) => {
  try {
    const users = await useUser.serviceGetUsersAll()
    res.json(users)
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error)
    res.status(500).json({ message: 'Error al obtener todos los usuarios' })
  }
}

export default getUsersAll
