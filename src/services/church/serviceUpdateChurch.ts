import Church from '@models/church'
import { ChurchAttributes } from '@type/iglesia/church'
import { churchValidationPartial } from '../../schemas/iglesia/churchSchema'

const serviceUpdateChurch = async (id: string, body: Partial<ChurchAttributes>) => {
  const church = await Church.findByPk(id)
  if (!church) return null

  const validation = churchValidationPartial(body as ChurchAttributes)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  await church.update(body)
  return church
}

export default serviceUpdateChurch
