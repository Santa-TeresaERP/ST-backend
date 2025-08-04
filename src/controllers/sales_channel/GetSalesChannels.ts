import { Request, Response } from 'express'
import useSalesChannel from '@services/sales_channel'

const GetSalesChannels = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await useSalesChannel.serviceGetSalesChannels()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error en GetSalesChannels:', error)
    res
      .status(500)
      .json({ error: 'Error interno al obtener los canales de venta' })
  }
}

export default GetSalesChannels
