import { Request, Response } from 'express'
import useSale from '@services/Sale/index'

const createSaleController = async (req: Request, res: Response) => {
  try {
    // Llamar al servicio para crear una nueva venta
    const saleRecord = await useSale.serviceCreateSale(req.body)

    // Si el servicio retorna un error, responder con un código 400
    if ('error' in saleRecord) {
      res.status(400).json(saleRecord)
    } else {
      // Responder con el registro creado y un código 201
      res.status(201).json(saleRecord)
    }
  } catch (error) {
    console.error('Error creating sale:', error)

    // Manejar errores internos del servidor
    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      })
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unknown error occurred',
      })
    }
  }
}

export default createSaleController
