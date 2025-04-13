import { serviceGetModules } from '@services/modules/serviceGetModules'
import { AuthRequest as Request } from '@type/user/auth'
import { Response } from 'express'

export async function getModules(_req: Request, res: Response) {
  try {
    const modules = await serviceGetModules()
    res.json(modules)
  } catch (error) {
    console.error('Error al obtener módulos:', error)
    res.status(500).json({ message: 'Error al obtener módulos' })
  }
}
