import { Request, Response } from 'express'
import useTypePerson from '@services/type_person'

const DeleteTypePerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useTypePerson.serviceDeleteTypePerson(id)
    if ('error' in result) {
      res.status(404).json({ error: result.error })
      return
    }
    res.status(200).json(result)
  } catch (error) {
    console.error('Error en DeleteTypePerson:', error)
    res
      .status(500)
      .json({ error: 'Error interno al eliminar el tipo de persona' })
  }
}

export default DeleteTypePerson
