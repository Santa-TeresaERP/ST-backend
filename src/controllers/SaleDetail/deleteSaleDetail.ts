import { Request, Response } from 'express'
import useSaleDetail from '@services/sale_detail'

const deleteSaleDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useSaleDetail.deleteSaleDetail(id)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    } else {
      res
        .status(200)
        .json({ message: 'Detalle de venta eliminado', detail: result })
    }
  } catch (err) {
    res.status(500).json({
      error: 'Error interno del servidor',
      detail: err instanceof Error ? err.message : err,
    })
  }
}

export default deleteSaleDetail
