import { z } from 'zod'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'

const recipeProductResourceSchema = z.object({
  product_id: z.string().uuid('El ID del producto debe ser un UUID válido'),

  quantity_required: z
    .string()
    .min(1, 'La cantidad requerida no puede estar vacía')
    .max(50, 'La cantidad requerida no debe exceder los 50 caracteres'),

  unit: z.enum(['g', 'kg', 'ml', 'l', 'unidades'], {
    invalid_type_error:
      'El tipo de unidad debe ser uno de: g, kg, ml, l, unidades',
  }),
})

export const recipeProductResourceValidation = (
  data: RecipeProductResourceAttributes,
) => recipeProductResourceSchema.safeParse(data)
