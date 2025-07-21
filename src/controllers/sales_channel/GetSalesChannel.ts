import { Request, Response } from 'express'
import useSalesChannel from '@services/sales_channel'

const GetSalesChannel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useSalesChannel.serviceGetSalesChannel(id)
    if ('error' in result) {
      res.status(404).json({ error: result.error })
      return
    }
    res.status(200).json(result)
  } catch (error) {
    console.error('Error en GetSalesChannel:', error)
    res.status(500).json({ error: 'Error interno al obtener el canal de venta' })
  }
}

export default GetSalesChannel 