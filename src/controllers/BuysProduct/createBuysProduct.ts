import { Request, Response } from 'express'
import useBuysProduct from '@services/BuysProduct'

const CreateBuysProduct = async (req: Request, res: Response) => {
  try {
    console.log('Received body:', JSON.stringify(req.body, null, 2))

    const result = await useBuysProduct.serviceCreateBuysProduct(req.body)

    if (!result.success) {
      console.log('Service error:', JSON.stringify(result, null, 2))

      res.status(400).json({
        error: result.error,
        message: result.message,
        body: req.body,
      })
      return
    }

    res.status(201).json(result)
  } catch (error) {
    console.error('Error en el controlador CreateBuysProduct:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default CreateBuysProduct
