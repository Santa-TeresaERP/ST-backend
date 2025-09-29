import express from 'express'
import authorization from '@middlewares/authorization'
import { getRentalsByDateController } from '@controllers/generarExcel/getRentalsByDateController'

const router = express.Router()

router.post('/by-date', authorization, getRentalsByDateController)

export default router
