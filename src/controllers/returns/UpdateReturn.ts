import { Request, Response } from 'express'
import useReturns from '@services/returns'

const UpdateReturn = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await useReturns.serviceUpdateReturn(req.params.id, req.body)

    if ('error' in result) {
      res.status(400).json({ success: false, error: result.error })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Devolución actualizada correctamente',
      data: result,
    })
  } catch (error) {
    console.error('Error en UpdateReturn:', error)
    res.status(500).json({
      success: false,
      error: 'Error interno al actualizar la devolución',
    })
  }
}

export default UpdateReturn
