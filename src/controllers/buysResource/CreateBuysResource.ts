import { Request, Response } from 'express'
import useBuysResource from '@services/BuysResource'

const CreateBuysResource = async (req: Request, res: Response) => {
  try {
    const result = await useBuysResource.serviceCreateBuysResource(req.body)

    if ('error' in result) {
      res.status(400).json({
        error: result.error,
        details: result.details, // <-- muestra detalles del error
        stack: result.stack, // <-- muestra stack si existe
        body: req.body,
      })
    } else {
      res.status(201).json({
        message: 'Recurso de almacén creado exitosamente',
        resource: result,
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
