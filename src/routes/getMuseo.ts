import { Router } from 'express'
import { getDataMuseoController } from '@controllers/generarExcel/getDataMuseoController'
import { exportMuseoExcelController } from '@controllers/generarExcel/exportMuseoExcelController'

const router = Router()

// POST -> /museo/data
router.post('/data', getDataMuseoController)
router.post('/export-excel', exportMuseoExcelController)

export default router
