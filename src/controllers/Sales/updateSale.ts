import { Request, Response } from 'express'
import useSale from '@services/Sale/index'

const updateSaleController = async (req: Request, res: Response) => {
  try {
    // Llamar al servicio para actualizar una venta específica por ID
    const saleRecord = await useSale.serviceUpdateSale(req.params.id, req.body)

    // Si el servicio retorna un error, responder con un código 404
    if ('error' in saleRecord) {
      res.status(404).json(saleRecord)
    } else {
      // Responder con el registro actualizado y un código 200
      res.status(200).json(saleRecord)
    }
  } catch (error) {
    console.error('Error updating sale:', error)

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

export default updateSaleController
