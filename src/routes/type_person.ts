import express from 'express'
import TypePersonController from '@controllers/type_person'
import authorization from '@middlewares/authorization'

const router = express.Router()

router.post('/', authorization, TypePersonController.CreateTypePerson)
router.get('/', authorization, TypePersonController.GetTypePersons)
router.get('/:id', authorization, TypePersonController.GetTypePerson)
router.patch('/:id', authorization, TypePersonController.UpdateTypePerson)
router.delete('/:id', authorization, TypePersonController.DeleteTypePerson)

export default router
