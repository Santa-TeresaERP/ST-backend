import { Request, Response } from 'express'
import useReturns from '@services/returns'
import CashSession from '@models/cashSession'

// Extendemos la interfaz para incluir la posible sesión activa
interface AuthRequest extends Request {
  activeCashSession?: CashSession
  user?: {
    id: string
  }
}

const GetReturns = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let storeId: string | undefined

    // Si hay una sesión de caja activa adjunta al request, usamos su tienda
    if (req.activeCashSession) {
      storeId = req.activeCashSession.store_id
    }

    // Si se proporciona un store_id en la query, lo usamos
    if (req.query.store_id) {
      storeId = req.query.store_id as string
    }

    const result = await useReturns.serviceGetReturns(storeId)

    if (!result) {
      res.status(500).json({ error: 'Error interno al obtener devoluciones' })
      return
    }

    if ('error' in result) {
      res.status(400).json({ error: result.error, details: result.details })
      return
    }

    res.status(200).json(result.data)
  } catch (error) {
    console.error('Error fetching returns:', error)
    res.status(500).json({
      error: 'Error al obtener devoluciones',
      details: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default GetReturns
