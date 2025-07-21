import { Request, Response } from 'express'
import useSale from '@services/Sale/index'
import CashSession from '@models/cashSession'

// Extendemos la interfaz para incluir la posible sesión activa
interface AuthRequest extends Request {
  activeCashSession?: CashSession
  user?: {
    id: string
  }
}

const getSalesController = async (req: AuthRequest, res: Response) => {
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

    // Llamar al servicio para obtener ventas, posiblemente filtradas por tienda
    const sales = await useSale.serviceGetSales(storeId)

    // Responder con la lista de ventas y un código 200
    res.status(200).json(sales)
  } catch (error) {
    console.error('Error fetching sales:', error)

    // Manejar errores internos del servidor
    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      })
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unknown error occurred',
      })
    }
  }
}

export default getSalesController
