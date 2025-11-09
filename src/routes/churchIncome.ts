import express from 'express'
import authorization from '@middlewares/authorization'
import useIncomeChurchController from '@controllers/church'

const router = express.Router()

router.post('/', authorization, useIncomeChurchController.createIncomeChurch)
router.get('/', authorization, useIncomeChurchController.getAllIncomes)
router.get('/active', authorization, useIncomeChurchController.getActiveIncomes)
router.get('/:id', authorization, useIncomeChurchController.getIncomeChurchById)
router.put('/:id', authorization, useIncomeChurchController.updateIncomeChurch)
router.delete('/:id', authorization, useIncomeChurchController.deleteIncomeChurch)

export default router
