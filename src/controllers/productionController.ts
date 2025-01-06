import useProduction from '@services/useProduction'
import production from '@models/production'
import { Request, Response } from 'express'
import { HttpError } from '@errors/http'

class productionController {
  static async createProduction(req: Request, res: Response) {
    try {
      const production = await useProduction.createProduction(req.body)
      if (!production) throw new HttpError('Production already exists', 400)

      res
        .status(201)
        .json({ message: 'Production created successfully', production })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  static async getProductions(_req: Request, res: Response) {
    try {
      const productions = await production.findAll()
      res.json(productions)
    } catch (error) {
      console.error('Error al obtener producciones:', error)
      res.status(500).json({ message: 'Error al obtener producciones' })
    }
  }

  static async deleteProduction(req: Request, res: Response) {
    try {
      const productionId = req.params.id
      await production.destroy({ where: { id: productionId } })
      res.json({ message: 'Producción eliminada' })
    } catch (error) {
      console.error('Error al eliminar producción:', error)
      res.status(500).json({ message: 'Error al eliminar producción' })
    }
  }

  static async updateProduction(req: Request, res: Response) {
    try {
      if (!req.body.id) {
        throw new HttpError('Production id is required', 400)
      }
      const production = useProduction.updateProduction(req.params.id, req.body)
      if (!production) throw new HttpError('Error to updating production', 400)

      res.json({ message: 'Production updated', production })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json(error.message)
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}

export default productionController
