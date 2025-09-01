import { Request, Response, NextFunction } from 'express'
import CashSession from '@models/cashSession'
import Sale from '@models/sale'
import Return from '@models/returns'

// Extendemos la interfaz de Request para incluir sesión de caja
interface AuthRequest extends Request {
  user?: {
    id: string
    [key: string]: unknown
  }
  activeCashSession?: CashSession
}

/**
 * Middleware para verificar si existe una sesión de caja activa para la tienda
 * Este middleware debe usarse después del middleware de autorización
 */
const cashSessionCheck = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let storeId: string | undefined

    // Caso 1: Si viene en el body (para creación)
    if (req.body.store_id) {
      storeId = req.body.store_id
    }
    // Caso 2: Si es una actualización o eliminación, obtenemos la tienda del recurso
    else if (req.params.id) {
      // Verificar si es una ruta de ventas
      if (req.originalUrl.includes('/sales/')) {
        const sale = await Sale.findByPk(req.params.id)
        if (sale) {
          storeId = sale.store_id
        }
      }
      // Verificar si es una ruta de devoluciones
      else if (req.originalUrl.includes('/returns/')) {
        const returnItem = await Return.findByPk(req.params.id)
        if (returnItem) {
          // Usar directamente el storeId de la devolución
          storeId = returnItem.storeId
        }
      }
    }

    // Si no se pudo determinar la tienda, continuamos sin verificar
    if (!storeId) {
      return next()
    }

    // Buscamos una sesión activa para la tienda
    const activeCashSession = await CashSession.findOne({
      where: {
        store_id: storeId,
        status: 'open',
      },
    })

    if (!activeCashSession) {
      res.status(403).json({
        error:
          'No hay una sesión de caja activa para esta tienda. Debe abrir una sesión primero.',
      })
      return
    }

    // Guardamos la sesión activa en el request para usarla en los controllers
    req.activeCashSession = activeCashSession
    next()
  } catch (error) {
    console.error('Error en cashSessionCheck:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default cashSessionCheck
