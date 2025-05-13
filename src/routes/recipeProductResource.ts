import { Router } from 'express'
import controller from '@controllers/recipes_resource'

const router = Router()

// Obtener todos los recursos de receta-producto
router.get('/', controller.GetRecipeProductResource)

// Crear un nuevo recurso de receta-producto
router.post('/', controller.CreateRecipeProductResource)

// Actualizar un recurso de receta-producto
router.put('/:id/:product_id', controller.UpdateRecipeProductResource)

// Eliminar un recurso de receta-producto
router.delete('/:id/:product_id', controller.DeleteRecipeProductResource)

export default router
