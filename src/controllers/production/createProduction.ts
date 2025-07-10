import { Request, Response } from 'express'
import { serviceCreateProduction } from '@services/Production'

const createProductionController = async (req: Request, res: Response) => {
  try {
    console.log('📝 Datos recibidos para crear producción:', req.body)
    const result = await serviceCreateProduction(req.body)

    if ('error' in result) {
      console.log('❌ Error en el service:', result.error)
      res.status(400).json({ error: result.error })
      return // 🔥 AGREGUÉ ESTE RETURN
    }

    console.log('📩 Producción creada correctamente desde el controlador')
    res.status(201).json(result)
  } catch (error) {
    console.error('❌ Error creando producción:', error)

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

export default createProductionController
