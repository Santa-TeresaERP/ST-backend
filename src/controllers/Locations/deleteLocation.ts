import { Request, Response } from 'express';
import useLocation from '@services/Locations'; // Asegúrate de tener este servicio creado

const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await useLocation.deleteLocation(id); // lógica en el servicio
    res.status(204).send(); // 204 No Content
  } catch (error: unknown) {
    console.error('Error deleting location:', error);

    let statusCode = 500;
    let errorMessage = 'Unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
      statusCode = error.message.includes('no encontrada') ? 404 : 500;
    }

    res.status(statusCode).json({
      error: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
      message: errorMessage,
    });
  }
};

export default deleteLocation;
