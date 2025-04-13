import { Request, Response } from 'express'
import { serviceDeleteUser } from '@services/User/serviceDeleteUser'

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id
    await serviceDeleteUser(userId)
    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).json({ message: 'Error al eliminar usuario' })
  }
}
