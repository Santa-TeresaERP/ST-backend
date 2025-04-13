import { Request, Response } from 'express'
import {serviceGetUsers} from '@services/User/serviceGetUsers'

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await serviceGetUsers()
    res.json(users)
  } catch (error) {
    console.error('Error al obtener usuarios activos:', error)
    res.status(500).json({ message: 'Error al obtener usuarios activos' })
  }
}