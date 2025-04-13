import { serviceUpdateModule } from '@services/modules/serviceUpdateModule'
import { AuthRequest as Request } from '@type/user/auth'
import { Response } from 'express'
import { HttpError } from '@errors/http'

export async function updateModule(req: Request, res: Response) {
  try {
    const module = await serviceUpdateModule(req.params.id, req.body)
    if ('error' in module)
      throw new HttpError('Error al actualizar el modulo', 400)

    res.json({ message: 'Module updated', module })
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
