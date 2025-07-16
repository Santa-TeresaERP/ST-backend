import Return from '@models/returns'
import { returnValidation } from 'src/schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'

const serviceUpdateReturn = async (id: string, body: returnsAttributes) => {
  const validation = returnValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const existing = await Return.findByPk(id)
  if (!existing) return { error: 'Devolución no encontrada' }

  const { productId, salesId, reason, observations, createdAt } =
    validation.data

  const updated = await existing
    .update({
      productId,
      salesId,
      reason: reason ?? '', // evitar null
      observations: observations ?? undefined,
      ...(createdAt ? { createdAt } : {}),
    })
    .catch((error) => {
      return {
        error: 'Error al actualizar la devolución',
        details: error.message,
      }
    })

  return updated
}

export default serviceUpdateReturn
