import { Request, Response, RequestHandler } from 'express'
import useCategories from '@services/useCategories'

class categoriesController {
  // Crear una categoría
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
    } catch (error) {
      console.error('Error al crear la categoría:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // Obtener todas las categorías
  static getCategories: RequestHandler = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const categories = await useCategories.getCategories()
      res.json(categories)
    } catch (error) {
      console.error('Error en getCategories controller:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // Actualizar una categoría
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
    } catch (error) {
      console.error('Error al actualizar la categoría:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // Eliminar una categoría
  static deleteCategory: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const result = await useCategories.deleteCategory(req.params.id)
      if (result.error) {
        res.status(400).json({ error: result.error }) // Devuelve el mensaje de error al frontend
      } else {
        res.json({ message: result.message }) // Devuelve el mensaje de éxito al frontend
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

export default categoriesController
