import { Router } from 'express'
import { getAlquileresData } from '@controllers/generarExcel/getrentalsController'

const router = Router()

// POST /rentals/income
router.post('/income', getAlquileresData)

export default router
