import { Router } from 'express'
import { getIglesiaData } from '@controllers/generarExcel/getDataIglesiaController'
import { exportIglesiaExcelController } from '@controllers/generarExcel/exportIglesiaExcelController'

const router = Router()

// POST /church/income
// Recibe { startDate, endDate } en el body y devuelve los ingresos de la iglesia filtrados
router.post('/income', getIglesiaData)

router.post('/export-excel', exportIglesiaExcelController)

export default router
