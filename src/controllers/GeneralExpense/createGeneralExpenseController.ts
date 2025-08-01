import { Request, Response } from 'express';
import useGeneralExpense from '@services/GeneralExpense';

const createGeneralExpenseController = async (req: Request, res: Response) => {
  try {
    const result = await useGeneralExpense.create(req.body);

    if (result && 'error' in result) {
      return res.status(400).json({ message: result.error });
    }
    
    return res.status(201).json(result);

  } catch (error) {
    console.error('Error en el controlador de creación de gasto:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export default createGeneralExpenseController;