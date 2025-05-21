import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const conversion = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.params

    if (!resourceId) {
      res.status(400).json({ error: 'El ID del recurso es requerido' })
    }

    // Llamar al servicio de conversión
    const result = await useRecipes.conversion(resourceId)

    // Responder con los datos convertidos
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default conversion
