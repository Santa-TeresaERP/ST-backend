import { z } from 'zod'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'

const recipeProductResourceSchema = z.object({
  product_id: z.string().uuid('El ID del producto debe ser un UUID válido'),

  quantity_required: z
    .string()
    .min(1, 'La cantidad requerida no puede estar vacía')
    .max(50, 'La cantidad requerida no debe exceder los 50 caracteres'),

  unit: z
    .string()
    .min(1, 'La unidad no puede estar vacía')
    .max(20, 'La unidad no debe exceder los 20 caracteres'),

  resource_id: z
    .string()
    .uuid('El ID del recurso debe ser un UUID válido')
    .optional(), // Es opcional según la interfaz
})

export const recipeProductResourceValidation = (
  data: RecipeProductResourceAttributes,
) => recipeProductResourceSchema.safeParse(data)
