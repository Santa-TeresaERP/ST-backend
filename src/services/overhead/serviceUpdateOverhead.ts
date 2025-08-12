import Overhead from '@models/overhead'
import { overheadUpdateValidation } from 'src/schemas/finanzas/overheadsSchema'
import { OverheadAttributes } from '@type/finanzas/overheads'

const serviceUpdateOverhead = async (
  id: string,
  body: Partial<OverheadAttributes>,
) => {
  const validation = overheadUpdateValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const overhead = await Overhead.findByPk(id)
  if (!overhead) {
    return { error: 'Overhead not found' }
  }
  await overhead.update(validation.data)
  return overhead
}

export default serviceUpdateOverhead
