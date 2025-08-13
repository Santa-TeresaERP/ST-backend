import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

// Esta es la implementación más segura para evitar errores de headers.
const updateWarehouseStoreController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await useWarehouseStore.serviceUpdateWarehouseStore(
      req.params.id,
      req.body,
    )

    // Si el servicio devuelve un objeto con la propiedad 'error', es un error de negocio.
    if (result && 'error' in result) {
      res.status(400).json({ message: result.error })
    } else {
      // Si no, es un éxito.
      res.status(200).json(result)
    }
  } catch (error) {
    // Este bloque solo se ejecuta si el servicio lanza una excepción.
    console.error('Error in updateWarehouseStoreController:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default updateWarehouseStoreController
