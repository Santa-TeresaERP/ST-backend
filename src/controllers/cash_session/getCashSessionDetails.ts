import { Response } from 'express'
import CashSession from '@models/cashSession'
import serviceGetSessionTotals from '@services/cash_session/serviceGetSessionTotals'
import { AuthRequest } from '@type/user/auth'

/**
 * Controlador para obtener los detalles de una sesión de caja incluyendo totales
 */
const getCashSessionDetails = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    // Verificar si existe la sesión
    const cashSession = await CashSession.findByPk(id)

    if (!cashSession) {
      res.status(404).json({
        error: 'Sesión de caja no encontrada',
      })
      return
    }

    // Verificar permisos - cualquier usuario autenticado puede ver los detalles por ahora
    // Comentamos esta verificación para permitir acceso mientras se desarrolla
    /*
    if (
      req.authUser?.userId !== cashSession.user_id &&
      !req.authUser?.rolId.includes('admin')
    ) {
      res.status(403).json({
        error: 'No tiene permisos para ver esta sesión de caja',
      })
      return
    }
    */

    // Obtener datos detallados incluyendo totales
    const sessionDetails = await serviceGetSessionTotals(id)

    if ('error' in sessionDetails) {
      res.status(400).json(sessionDetails)
      return
    }

    res.status(200).json(sessionDetails)
  } catch (error) {
    console.error('Error al obtener detalles de la sesión:', error)
    res.status(500).json({
      error: 'Error interno del servidor',
    })
  }
}

export default getCashSessionDetails
