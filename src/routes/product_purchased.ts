import express from 'express'
// Importamos el objeto agrupador de controladores para una mayor limpieza
import authorization from '@middlewares/authorization'
import productPurchasedController from '@controllers/Product_Purchased'

const router = express.Router()

router.post('/', authorization, productPurchasedController.create)

router.get('/', authorization, productPurchasedController.get)

router.get('/all', authorization, productPurchasedController.getAll)

router.get('/:id', authorization, productPurchasedController.getById)

router.patch('/:id', authorization, productPurchasedController.update)

router.delete('/:id', authorization, productPurchasedController.delete)

export default router
