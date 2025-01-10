import { Request, Response } from 'express'
import useRoles from '@services/useRoles'

export const createRoleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await useRoles.createRole(req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }

    res.status(201).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getRolesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const roles = await useRoles.getRoles()
    res.status(200).json(roles)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateRoleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useRoles.updateRole(id, req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteRoleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useRoles.deleteRole(id)

    if (result.error) {
      res.status(404).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
