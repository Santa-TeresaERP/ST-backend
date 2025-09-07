import { Router } from 'express'
import { getDataDeVentasController } from '@controllers/generarExcel/dataDeVentasController'

const router = Router()

// POST porque recibe startDate y endDate en el body
router.post('/data-ventas', getDataDeVentasController)

export default router
