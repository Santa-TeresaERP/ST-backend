import { Router } from 'express'
import { getAlquileresData } from '@controllers/generarExcel/getrentalsController'
import { exportAlquileresExcelController } from '@controllers/generarExcel/exportAlquileresExcelController'

const router = Router()

// POST /rentals/income
router.post('/income', getAlquileresData)
router.post('/export-excel', exportAlquileresExcelController)

export default router
