import Return from '@models/returns'
import { returnValidation } from 'src/schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'

const serviceCreateReturn = async (body: returnsAttributes) => {
  const validation = returnValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { productId, salesId, reason, observations } = validation.data

  const newReturn = await Return.create({
    productId,
    salesId,
    reason: reason ?? '',
    observations: observations ?? undefined,
  }).catch((error) => {
    return { error: 'Error al registrar la devolución', details: error.message }
  })

  return newReturn
}

export default serviceCreateReturn
