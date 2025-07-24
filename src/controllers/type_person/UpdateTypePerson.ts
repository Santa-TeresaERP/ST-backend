import { Request, Response } from 'express'
import useTypePerson from '@services/type_person'

const UpdateTypePerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useTypePerson.serviceUpdateTypePerson(id, req.body)
    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }
    res.status(200).json({
      message: 'Tipo de persona actualizado exitosamente',
      data: result,
    })
  } catch (error) {
    console.error('Error en UpdateTypePerson:', error)
    res
      .status(500)
      .json({ error: 'Error interno al actualizar el tipo de persona' })
  }
}

export default UpdateTypePerson
