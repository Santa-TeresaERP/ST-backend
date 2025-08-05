import serviceDeleteWarehouseMovementResource from '@services/warehouseMovementResource/serviceDeleteWarehouseMovementResource';
import { Request, Response } from 'express';

const deleteWarehouseMovementResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await serviceDeleteWarehouseMovementResource(id);

    if ('error' in result) {
      res.status(404).json({ error: result.error });
      return;
    }

    res.json({ message: result.message });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default deleteWarehouseMovementResource;
