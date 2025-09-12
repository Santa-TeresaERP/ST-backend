import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const deleteOverheadController = async (req: Request, res: Response) => {
  const { deleteOverhead } = useOverhead()
  const { id } = req.params
  // Permitir pasar status opcional vía body o query; si no viene, se hará toggle
  const rawStatus = (req.body?.status ?? req.query?.status) as
    | string
    | boolean
    | undefined
  const statusParam =
    typeof rawStatus === 'string'
      ? rawStatus.toLowerCase() === 'true'
        ? true
        : rawStatus.toLowerCase() === 'false'
          ? false
          : undefined
      : typeof rawStatus === 'boolean'
        ? rawStatus
        : undefined

  try {
    const result = await deleteOverhead(id, statusParam)

    if ('error' in result) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
