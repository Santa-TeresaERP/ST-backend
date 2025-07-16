import { Request, Response } from 'express'
import useSaleDetail from '@services/sale_detail'

const getSaleDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const detail = await useSaleDetail.getSaleDetail(id)

    if (!detail) {
      res.status(404).json({ error: 'Detalle de venta no encontrado' })
    } else {
      res.status(200).json(detail)
    }
  } catch (err) {
    res.status(500).json({
      error: 'Error interno del servidor',
      detail: err instanceof Error ? err.message : err,
    })
  }
}

export default getSaleDetail
