import { Request, Response } from 'express'
import useSaleDetail from '@services/sale_detail'

const createSaleDetail = async (req: Request, res: Response) => {
  try {
    const result = await useSaleDetail.createSaleDetail(req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    } else {
      res
        .status(201)
        .json({ message: 'Detalle de venta creado', detail: result })
    }
  } catch (err) {
    res.status(500).json({
      error: 'Error interno del servidor',
      detail: err instanceof Error ? err.message : err,
    })
  }
}

export default createSaleDetail
