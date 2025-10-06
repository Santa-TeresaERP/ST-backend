import { Router } from 'express'
import { getMonasterioDataController } from '@controllers/generarExcel/getMonasterioDataController'
import { exportMonasteriosExcelController } from '@controllers/generarExcel/exportMonasteriosExcelController'

const router = Router()

// Endpoint POST para obtener los gastos del módulo Monasterio
router.post('/data', getMonasterioDataController)

router.post('/export-excel', exportMonasteriosExcelController)

export default router
