import express from 'express'
import authorization from '@middlewares/authorization'
import { exportRentalsExcelController } from '@controllers/generarExcel/exportRentalsExcelController'

const router = express.Router()

// Exportar alquileres filtrados por fecha a Excel
router.post('/by-date/excel', authorization, exportRentalsExcelController)

export default router
