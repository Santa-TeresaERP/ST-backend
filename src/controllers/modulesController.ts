import useModules from '@services/useModules'
import { Response } from 'express'
import { AuthRequest as Request } from '@type/auth'
import { HttpError } from '@errors/http'

class modulesController {
  static async getModules(_req: Request, res: Response) {
    try {
      const modules = await useModules.getModules()
      res.json(modules)
    } catch (error) {
      console.error('Error al obtener módulos:', error)
      res.status(500).json({ message: 'Error al obtener módulos' })
    }
  }

  static async getModuleById(req: Request, res: Response) {
    try {
      const module = await useModules.getModuleById(req.params.id)
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
  static async updateModule(req: Request, res: Response) {
    try {
      const module = await useModules.updateModule(req.params.id, req.body)
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
}

export default modulesController
