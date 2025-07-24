import { Request, Response } from 'express'
import serviceCreateTypePerson from '@services/type_person/serviceCreateTypePerson'

const CreateTypePerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceCreateTypePerson(req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(201).json({
      message: 'Tipo de persona creado exitosamente',
      data: result,
    })
  } catch (error) {
    console.error('Error en CreateTypePerson:', error)
    res.status(500).json({ error: 'Error interno al crear el tipo de persona' })
  }
}

export default CreateTypePerson
