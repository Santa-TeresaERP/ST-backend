import { Router } from 'express'
import { getGeneralReportExcelController } from '@controllers/generarExcel/generalReportExcelController'

const router = Router()

router.post('/report-excel', getGeneralReportExcelController)

export default router
