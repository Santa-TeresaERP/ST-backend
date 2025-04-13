import { Request, Response } from 'express'
import {serviceChangePassword} from '@services/User/serviceChangePassword'

export async function changePassword(req: Request, res: Response) {
  try {
    const { currentPassword, newPassword } = req.body
    const userId = req.params.id

    const result = await serviceChangePassword(
      userId,
      currentPassword,
      newPassword,
    )

    if (result.error) {
      res.status(400).json({ error: result.error }) // Error en la operación
    } else {
      res.json({ message: result.message }) // Contraseña cambiada con éxito
    }
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    res.status(500).json({ message: 'Error al cambiar contraseña' })
  }
}