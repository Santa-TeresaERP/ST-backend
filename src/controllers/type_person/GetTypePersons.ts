import { Request, Response } from 'express'
import useTypePerson from '@services/type_person'

const GetTypePersons = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await useTypePerson.serviceGetTypePersons()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error en GetTypePersons:', error)
    res
      .status(500)
      .json({ error: 'Error interno al obtener los tipos de persona' })
  }
}

export default GetTypePersons
