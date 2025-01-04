import { Request, Response, RequestHandler } from 'express'
import useCategories from '@services/useCategories'

class categoriesController {
  static createCategory: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const category = await useCategories.createCategory(req.body)
      if ('error' in category) {
        res.status(400).json({ error: category.error })
      } else {
        res
          .status(201)
          .json({ message: 'Categoría creada exitosamente', category })
      }
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static getCategories: RequestHandler = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const categories = await useCategories.getCategories()
      res.json(categories)
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static updateCategory: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const category = await useCategories.updateCategory(
        req.params.id,
        req.body,
      )
      if ('error' in category) {
        res.status(400).json({ error: category.error })
      } else {
        res.json({ message: 'Categoría actualizada', category })
      }
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static deleteCategory: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const result = await useCategories.deleteCategory(req.params.id)
      if (result.error) {
        res.status(400).json({ error: result.error })
      } else {
        res.json({ message: result.message })
      }
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

export default categoriesController
