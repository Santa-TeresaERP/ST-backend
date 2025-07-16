import { v4 as uuidv4 } from 'uuid'
import Return from '@models/returns'
import { returnValidation } from 'src/schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'

const serviceCreateReturn = async (body: returnsAttributes) => {
  const validation = returnValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  // Genera un UUID si no se envió uno
  const {
    id = uuidv4(),
    productId,
    salesId,
    reason,
    observations,
  } = validation.data

  const newReturn = await Return.create({
    id, // Asegura que siempre haya un id
    productId,
    salesId,
    reason: reason ?? '',
    observations: observations ?? undefined,
  }).catch((error) => {
    return {
      error: 'Error al registrar la devolución',
      details: error.message,
    }
  })

  return newReturn
}

export default serviceCreateReturn
