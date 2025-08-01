import { Request, Response } from 'express';
import useFinancialReport from '@services/FinancialReport';

const createFinancialReportController = async (req: Request, res: Response) => {
  try {
    // Llama al servicio 'create' pasándole el cuerpo de la petición
    const result = await useFinancialReport.create(req.body);

    // Si el servicio devuelve un error de negocio, responde con un 400
    if (result && 'error' in result) {
      return res.status(400).json({ message: result.error });
    }
    
    // Si la creación es exitosa, responde con 201 Created y el nuevo reporte
    return res.status(201).json(result);

  } catch (error) {
    console.error('Error en el controlador de creación de reporte:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export default createFinancialReportController;