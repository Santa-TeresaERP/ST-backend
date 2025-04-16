import { Request, Response } from 'express'
import useUser from '@services/user/index'

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    await useUser.serviceDeleteUser(userId)
    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).json({ message: 'Error al eliminar usuario' })
  }
}

export default deleteUser
