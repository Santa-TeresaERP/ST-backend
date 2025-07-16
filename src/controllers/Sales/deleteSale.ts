import { Request, Response } from 'express'
import useSale from '@services/Sale/index'

const deleteSaleController = async (req: Request, res: Response) => {
  try {
    // Llamar al servicio para eliminar una venta específica por ID
    const result = await useSale.serviceDeleteSale(req.params.id)

    // Si el servicio retorna un error, responder con un código 404
    if ('error' in result) {
      res.status(404).json(result)
    } else {
      // Responder con un mensaje de éxito y un código 200
      res.status(200).json(result)
    }
  } catch (error) {
    console.error('Error deleting sale:', error)

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

export default deleteSaleController
