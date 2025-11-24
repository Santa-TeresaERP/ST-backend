import { Request, Response } from 'express'
import useIncomeChurch from '@services/IncomeChurch'

const { serviceDeleteIncomeChurch } = useIncomeChurch

const deleteIncomeChurch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // 1. Extraemos 'id' (el identificador único de la fila), NO 'churchId'
    // Esto debe coincidir con tu ruta: router.delete('/:id', ...)
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: 'El ID del ingreso es requerido' })
      return
    }

    // 2. Pasamos el ID específico al servicio
    const result = await serviceDeleteIncomeChurch(id)

    if (!result.success) {
      // Usualmente 404 si no se encontró el registro para borrar
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json({
      message: result.message,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error('Error en deleteIncomeChurch.controller:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default deleteIncomeChurch
