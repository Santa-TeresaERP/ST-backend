import { Request, Response } from 'express'
import useSale from '@services/Sale/index'

const getSalesController = async (_req: Request, res: Response) => {
  try {
    // Llamar al servicio para obtener todas las ventas
    const sales = await useSale.serviceGetSales()

    // Responder con la lista de ventas y un código 200
    res.status(200).json(sales)
  } catch (error) {
    console.error('Error fetching sales:', error)

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

export default getSalesController
