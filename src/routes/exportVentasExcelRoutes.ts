import { Router } from 'express'
import { exportVentasExcelController } from '@controllers/generarExcel/exportVentasExcelController'

const router = Router()

// POST porque recibe fechas en el body
router.post('/export-ventas-excel', exportVentasExcelController)

export default router
