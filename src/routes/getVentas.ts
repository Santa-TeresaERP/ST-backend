import { Router } from 'express'
import { getDataVentasController } from '@controllers/generarExcel/getDataVentasController'
import { exportVentasExcelController } from '../controllers/generarExcel/exportVentasExcelController'

const router = Router()

// POST -> /ventas/data
router.post('/data', getDataVentasController)
router.post('/export-excel', exportVentasExcelController)

export default router
