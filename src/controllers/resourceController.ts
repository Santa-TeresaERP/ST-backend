import useResource from '@services/useResource'
import resource from '@models/resource'
import { Request, Response } from 'express'
import { HttpError } from '@errors/http'

class resourceController {
  static async createResource(req: Request, res: Response) {
    try {
      const resource = await useResource.createResource(req.body)
      if (!resource) throw new HttpError('Resource already exists', 400)

      res
        .status(201)
        .json({ message: 'Resource created successfully', resource })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  static async getResources(_req: Request, res: Response) {
    try {
      const resources = await resource.findAll()
      res.json(resources)
    } catch (error) {
      console.error('Error al obtener recursos:', error)
      res.status(500).json({ message: 'Error al obtener recursos' })
    }
  }

  static async deleteResource(req: Request, res: Response) {
    try {
      const resourceId = req.params.id
      await resource.destroy({ where: { id: resourceId } })
      res.json({ message: 'Recurso eliminado' })
    } catch (error) {
      console.error('Error al eliminar recurso:', error)
      res.status(500).json({ message: 'Error al eliminar recurso' })
    }
  }

  static async updateResource(req: Request, res: Response) {
    try {
      if (!req.body.id) {
        throw new HttpError('Resource id is required', 400)
      }
      const resource = useResource.updateResource(req.params.id, req.body)
      if (!resource) throw new HttpError('Error to updating resource', 400)

      res.json({ message: 'Resource updated', resource })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json(error.message)
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}

export default resourceController
