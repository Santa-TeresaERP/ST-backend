import { Router } from 'express'
import { exportAlquileresExcelController } from '@controllers/generarExcel/exportAlquileresExcelController'

const router = Router()

// POST → Generar y descargar Excel de alquileres
router.post('/export-excel', exportAlquileresExcelController)

export default router
