import { Request, Response } from 'express'
import serviceCreateSalesChannel from '@services/sales_channel/serviceCreateSalesChannel'

const CreateSalesChannel = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceCreateSalesChannel(req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(201).json({
      message: 'Canal de venta creado exitosamente',
      data: result,
    })
  } catch (error) {
    console.error('Error en CreateSalesChannel:', error)
    res.status(500).json({ error: 'Error interno al crear el canal de venta' })
  }
}

export default CreateSalesChannel 