import { Router } from 'express'
import buysResourceController from '@controllers/buysResource'

const router = Router()

router.get('/', buysResourceController.GetBuysResources)
router.post('/', buysResourceController.CreateBuysResource)
router.patch('/:id', buysResourceController.UpdateBuysResource)
router.delete('/:id', buysResourceController.DeleteBuysResource)
router.get('/:id', buysResourceController.GetBuysResourceById) // Nueva ruta

export default router
