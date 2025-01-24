import { Request, Response, RequestHandler } from 'express'
import useProducts from '@services/useProducts'

class productsController {
  static createProduct: RequestHandler = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const product = await useProducts.createProduct(req.body)
      if ('error' in product) {
        res.status(400).json({ error: product.error })
        return
      }

      res.status(201).json({ message: 'Producto creado exitosamente', product })
      return
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
      return
    }
  }

  static getProducts: RequestHandler = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const products = await useProducts.getProducts()
      res.json(products)
      return
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
      return
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await useProducts.updateProduct(req.params.id, req.body)
      if ('error' in product) {
        res.status(400).json({ error: product.error })
        return // Asegúrate de retornar después de enviar la respuesta
      }

      res.json({ message: 'Producto actualizado', product })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const product = await useProducts.deleteProduct(req.params.id)
      if ('error' in product) {
        res.status(400).json({ error: product.error })
      }

      res.json({ message: 'Producto eliminado' })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

export default productsController
