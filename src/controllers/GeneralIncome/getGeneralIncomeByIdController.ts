import { Request, Response } from 'express';
import useGeneralIncome from '@services/GeneralIncome';

const getGeneralIncomeByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await useGeneralIncome.getById(id);

    if (result && 'error' in result) {
      return res.status(404).json({ message: result.error });
    }
    
    return res.status(200).json(result);

  } catch (error) {
    console.error('Error en el controlador para obtener ingreso por ID:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export default getGeneralIncomeByIdController;