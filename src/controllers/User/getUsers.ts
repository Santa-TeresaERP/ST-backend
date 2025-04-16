import { Request, Response } from 'express'
import useUser from '@services/user/index'

const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await useUser.serviceGetUsers()
    res.json(users)
  } catch (error) {
    console.error('Error al obtener usuarios activos:', error)
    res.status(500).json({ message: 'Error al obtener usuarios activos' })
  }
}

export default getUsers
