import { Request, Response, RequestHandler } from 'express'
import useProducts from '@services/useProduct'

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

  static updateProduct: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const product = await useProducts.updateProduct(req.params.id, req.body)
      if ('error' in product) {
        res.status(400).json({ error: product.error })
        return
      }

      res.json({ message: 'Producto actualizado', product })
      return
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
      return
    }
  }

  static deleteProduct: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const result = await useProducts.deleteProduct(req.params.id)
      if ('error' in result) {
        res.status(400).json({ error: result.error })
        return
      }

      res.json({ message: result.message })
      return
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
      return
    }
  }
}

export default productsController
