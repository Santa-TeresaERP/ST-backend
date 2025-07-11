import { Request, Response } from 'express'
import useBuysResource from '@services/BuysResource'

const CreateBuysResource = async (req: Request, res: Response) => {
  try {
    // Log para depuración
    console.log('Received body:', JSON.stringify(req.body, null, 2))

    const result = await useBuysResource.serviceCreateBuysResource(req.body)

    if ('error' in result) {
      // Log del error para depuración
      console.log('Service error:', JSON.stringify(result, null, 2))

      res.status(400).json({
        error: result.error,
        details: result.details, // <-- muestra detalles del error
        ...('stack' in result && result.stack && { stack: result.stack }), // <-- muestra stack si existe
        body: req.body,
      })
    } else {
      res.status(201).json({
        message: result.message || 'Operación exitosa',
        action: result.action,
        resource: result.resource,
      })
    }
  } catch (err) {
    // Mostrar el error real del catch
    res.status(500).json({
      error: 'Error interno del servidor',
      detail: err instanceof Error ? err.message : err,
    })
  }
}

export default CreateBuysResource
