import { Request, Response } from 'express'
import index from '@services/Products/index'

const createProductController = async (req: Request, res: Response) => {
  try {
    // 1. Construir la URL base del backend dinámicamente
    const baseUrl = `${req.protocol}://${req.get('host')}`

    const productData = {
      ...req.body,
      price: parseFloat(req.body.price),
      // 2. Usar la URL base para crear una URL absoluta para la imagen
      imagen_url: req.file
        ? `${baseUrl}/uploads/products/${req.file.filename}`
        : req.body.imagen_url || undefined,
    }

    const product = await index.createProduct(productData)

    if ('error' in product) {
      res.status(400).json({ error: product.error })
      return
    }

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product,
    })
  } catch (error) {
    console.error('Error in createProduct controller:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default createProductController
