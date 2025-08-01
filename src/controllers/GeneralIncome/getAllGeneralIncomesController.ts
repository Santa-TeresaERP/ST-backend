import { Request, Response } from 'express';
import useGeneralIncome from '@services/GeneralIncome';

const getAllGeneralIncomesController = async (req: Request, res: Response) => {
  try {
    const result = await useGeneralIncome.getAll();

    if (result && 'error' in result) {
      return res.status(400).json({ message: result.error });
    }
    
    return res.status(200).json(result);

  } catch (error) {
    console.error('Error en el controlador para obtener todos los ingresos:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export default getAllGeneralIncomesController;