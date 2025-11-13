import Church from '@models/church'
import { ChurchAttributes } from '@type/iglesia/church'
import { churchValidationPartial } from '../../schemas/iglesia/churchSchema'

const serviceCreateChurch = async (body: ChurchAttributes) => {
  const validation = churchValidationPartial(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name } = body

  const existing = await Church.findOne({ where: { name } })
  if (existing) return null

  const church = await Church.create(body)
  return church
}

export default serviceCreateChurch
