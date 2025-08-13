import express from 'express'
import authorization from '@middlewares/authorization' // opcional
import generatePDFController from '@controllers/GeneratePDF'

const router = express.Router()

// Si montas este router en "/generarPDF", aquí debe ser solo "/:serviceKey"
router.post('/:serviceKey', authorization, generatePDFController)

export default router
