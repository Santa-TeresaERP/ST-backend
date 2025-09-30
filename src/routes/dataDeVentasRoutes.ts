import { Router } from 'express'
import { getDataDeVentasController } from '@controllers/generarExcel/dataDeVentasController'

const router = Router()

// Ruta POST para obtener el reporte general de ventas
router.post('/ventas/data', getDataDeVentasController)

export default router
