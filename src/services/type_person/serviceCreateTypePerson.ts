import { v4 as uuidv4 } from 'uuid'
import TypePerson from '@models/type_person'
import { typePersonValidation } from 'src/schemas/museo/type_person'
import { typePersonAttributes } from '@type/museo/type_person'

const serviceCreateTypePerson = async (body: typePersonAttributes) => {
  const validation = typePersonValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const name = validation.data.name
  const base_price = validation.data.base_price
  const id = body.id || uuidv4()

  const newTypePerson = await TypePerson.create({
    id,
    name,
    base_price,
  }).catch((error) => {
    return {
      error: 'Error al registrar el tipo de persona',
      details: error.message,
    }
  })

  return newTypePerson
}

export default serviceCreateTypePerson 