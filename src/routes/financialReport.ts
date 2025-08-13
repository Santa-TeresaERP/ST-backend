import express from 'express'
import authorization from '@middlewares/authorization'

// [CORREGIDO] Se renombra la variable importada para mayor claridad.
// Ahora importamos el objeto de controladores específico para FinancialReport.
import financialReportController from '@controllers/FinancialReport'

const router = express.Router()

// Asignamos cada método HTTP y ruta a su controlador correspondiente

//  Generar un nuevo reporte
// [CORREGIDO] Se accede directamente a los métodos del objeto importado.
router.post('/', authorization, financialReportController.create)

//  Obtener todos los reportes
router.get('/', authorization, financialReportController.getAll)

//  Obtener un reporte por ID
router.get('/:id', authorization, financialReportController.getById)

//  Actualizar las observaciones de un reporte
router.put('/:id', authorization, financialReportController.update)

//  Eliminar un reporte
router.delete('/:id', authorization, financialReportController.delete)

export default router
