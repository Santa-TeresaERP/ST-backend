import express from 'express'
import authorization from '@middlewares/authorization'
import productionController from '@controllers/production'

const router = express.Router()

router.post('/', authorization, productionController.createProduction)
router.get('/', authorization, productionController.getProductions)
router.get('/:id', authorization, productionController.getProduction)
router.patch('/:id', authorization, productionController.updateProduction)
router.patch('/:id/status', authorization, productionController.toggleProductionStatus)


export default router
