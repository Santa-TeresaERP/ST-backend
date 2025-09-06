import { Request, Response } from 'express'
import { getDataDeVentas } from '@services/generarExcel/DataDepVentas'

export const getDataDeVentasController = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.body

        if (!startDate || !endDate) {
            res.status(400).json({
                success: false,
                message: 'Debes enviar startDate y endDate en el body',
            })
        }

        const result = await getDataDeVentas(startDate, endDate)

        if (!result.success) {
            res.status(400).json(result)
        }

        res.json(result)
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `Error en getDataDeVentasController: ${error.message}`,
        })
    }
}
