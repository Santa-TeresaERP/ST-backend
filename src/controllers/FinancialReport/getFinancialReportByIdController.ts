import { Request, Response } from 'express';
import useFinancialReport from '@services/FinancialReport';

const getFinancialReportByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await useFinancialReport.getById(id);

    // Si el servicio devuelve 'error' (ej. no encontrado), responde con 404
    if (result && 'error' in result) {
      return res.status(404).json({ message: result.error });
    }
    
    return res.status(200).json(result);

  } catch (error) {
    console.error('Error en el controlador para obtener reporte por ID:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export default getFinancialReportByIdController;