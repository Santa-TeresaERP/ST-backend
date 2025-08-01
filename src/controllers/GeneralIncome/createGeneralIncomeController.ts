import { Request, Response } from 'express';
import useGeneralIncome from '@services/GeneralIncome';

const createGeneralIncomeController = async (req: Request, res: Response) => {
  try {
    const result = await useGeneralIncome.create(req.body);

    if (result && 'error' in result) {
      res.status(400).json({ message: result.error });
    }
    
    res.status(201).json(result);

  } catch (error) {
    console.error('Error en el controlador de creación de ingreso:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export default createGeneralIncomeController;