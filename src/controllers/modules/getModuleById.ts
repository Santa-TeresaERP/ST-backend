import { serviceGetModuleById } from '@services/modules/serviceGetModuleById'
import { AuthRequest as Request } from '@type/user/auth'
import { Response } from 'express'
import { HttpError } from '@errors/http'

export async function getModuleById(req: Request, res: Response) {
  try {
    const module = await serviceGetModuleById(req.params.id)
    if ('error' in module) throw new HttpError(module.error, 404)

    res.json(module)
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
