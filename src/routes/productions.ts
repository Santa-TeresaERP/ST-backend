import express from 'express'
import authorization from '@middlewares/authorization'
import productionController from '@controllers/productionController'

const router = express.Router()

router.post('/', authorization, productionController.createProduction)

router.get('/', authorization, productionController.getProductions)

router.delete('/:id', authorization, productionController.deleteProduction)

router.patch('/:id', authorization, productionController.updateProduction)

export default router
