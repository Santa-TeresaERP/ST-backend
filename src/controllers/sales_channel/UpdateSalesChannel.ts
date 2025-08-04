import { Request, Response } from 'express'
import useSalesChannel from '@services/sales_channel'

const UpdateSalesChannel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useSalesChannel.serviceUpdateSalesChannel(id, req.body)
    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }
    res.status(200).json({
      message: 'Canal de venta actualizado exitosamente',
      data: result,
    })
  } catch (error) {
    console.error('Error en UpdateSalesChannel:', error)
    res
      .status(500)
      .json({ error: 'Error interno al actualizar el canal de venta' })
  }
}

export default UpdateSalesChannel
