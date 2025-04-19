import useResource from '@services/useResource'
import resource from '@models/resource'
import { Request, Response } from 'express'
import { HttpError } from '@errors/http'

class resourceController {
  static async createResource(req: Request, res: Response): Promise<void> {
    try {
      console.log('Solicitud para crear recurso:', req.body)

      const resource = await useResource.createResource(req.body)

      // Si hay un error en la validación
      if ('error' in resource) {
        console.error('Errores de validación:', resource.error)
        res.status(400).json({ error: resource.error })
        return
      }

      if (!resource) throw new HttpError('Resource already exists', 400)

      console.log('Recurso creado con éxito:', resource)

      res
        .status(201)
        .json({ message: 'Resource created successfully', resource })
    } catch (error) {
      console.error('Error al crear recurso:', error)
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  static async getResources(_req: Request, res: Response): Promise<void> {
    try {
      console.log('Solicitud para obtener todos los recursos')
      const resources = await resource.findAll()
      console.log('Recursos obtenidos:', resources)
      res.json(resources)
    } catch (error) {
      console.error('Error al obtener recursos:', error)
      res.status(500).json({ message: 'Error al obtener recursos' })
    }
  }

  static async deleteResource(req: Request, res: Response): Promise<void> {
    try {
      const resourceId = req.params.id
      console.log('Solicitud para eliminar recurso con ID:', resourceId)

      const result = await useResource.deleteResource(resourceId)
      if (!result) {
        console.log('Recurso no encontrado para eliminar:', resourceId)
        res.status(404).json({ message: 'Resource not found' })
        return // Importante: evita seguir ejecutando lógica después de responder
      }

      console.log('Recurso eliminado con éxito:', result)
      res.json(result)
    } catch (error) {
      console.error('Error al eliminar recurso:', error)
      res.status(500).json({ message: 'Error al eliminar recurso' })
    }
  }

  static async updateResource(req: Request, res: Response): Promise<void> {
    try {
      const resourceId = req.params.id // Ahora tomamos el id desde la URL
      console.log('Solicitud para actualizar recurso con ID:', resourceId)

      if (!resourceId) {
        throw new HttpError('Resource id is required in the URL', 400)
      }

      // Llamar a la función para actualizar el recurso
      const resource = await useResource.updateResource(resourceId, req.body)

      // Si hay errores de validación
      if (resource?.error) {
        console.error('Errores de validación:', resource.error)
        res.status(400).json({ error: resource.error })
        return
      }

      if (!resource) throw new HttpError('Error updating resource', 400)

      console.log('Recurso actualizado con éxito:', resource)
      res.json({ message: 'Resource updated', resource })
    } catch (error) {
      console.error('Error al actualizar recurso:', error)
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}

export default resourceController
