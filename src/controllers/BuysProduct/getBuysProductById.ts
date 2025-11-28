import { Request, Response } from 'express'
import use from '@services/BuysProduct'

const GetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: 'ID es requerido' })
      return
    }

    const result = await use.serviceGetBuysProductById(id)
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      res.status(404).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default GetById
