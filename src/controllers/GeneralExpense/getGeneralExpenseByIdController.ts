import { Request, Response } from 'express';
import useGeneralExpense from '@services/GeneralExpense';

const getGeneralExpenseByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await useGeneralExpense.getById(id);

    if (result && 'error' in result) {
      return res.status(404).json({ message: result.error });
    }
    
    return res.status(200).json(result);

  } catch (error) {
    console.error('Error en el controlador para obtener gasto por ID:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export default getGeneralExpenseByIdController;