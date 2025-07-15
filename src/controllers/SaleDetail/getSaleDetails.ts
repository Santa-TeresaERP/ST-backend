import { Request, Response } from 'express'
import useSaleDetail from '@services/sale_detail'

const getSaleDetails = async (_req: Request, res: Response) => {
  try {
    const details = await useSaleDetail.getSaleDetails()
    res.status(200).json(details)
  } catch (err) {
    res.status(500).json({
      error: 'Error interno del servidor',
      detail: err instanceof Error ? err.message : err,
    })
  }
}

export default getSaleDetails
