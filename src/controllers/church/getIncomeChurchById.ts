import { Request, Response } from 'express'
import useIncomeChurch from '@services/church'

const { serviceGetIncomeById } = useIncomeChurch

const getIncomeChurchById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    const result = await serviceGetIncomeById(id)

    if (!result.success) {
      res.status(404).json({
        success: false,
        message: result.message ?? 'Ingreso no encontrado',
        error: result.error,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Ingreso obtenido correctamente',
      income: result.income,
    })
  } catch (error) {
    console.error('Error en getIncomeChurchById.controller:', error)
    res.status(500).json({
      success: false,
      error: 'Error interno al obtener el ingreso por ID.',
    })
  }
}

export default getIncomeChurchById
