import { RequestHandler } from 'express'
import index from '@services/Products/index'
import { productsValidation } from 'src/schemas/production/productsSchema'
import { ProductAttributes } from '@type/production/products'

const createProductController: RequestHandler = async (req, res) => {
  try {
    const body: ProductAttributes = {
      ...req.body,
      price: Number(req.body.price),
      imagen_url: req.file ? `/uploads/${req.file.filename}` : '',
    }

    const result = productsValidation(body)

    if (!result.success) {
      res.status(400).json({ error: result.error.format() })
      return
    }

    const product = await index.createProduct(result.data)

    if ('error' in product) {
      res.status(400).json({ error: product.error })
      return
    }

    res.status(201).json({ message: 'Producto creado exitosamente', product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default createProductController
