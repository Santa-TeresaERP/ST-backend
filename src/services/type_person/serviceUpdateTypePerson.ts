import TypePerson from '@models/type_person'
import { typePersonValidation } from 'src/schemas/museo/type_person'
import { typePersonAttributes } from '@type/museo/type_person'

const serviceUpdateTypePerson = async (id: string, body: typePersonAttributes) => {
  const validation = typePersonValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const typePerson = await TypePerson.findByPk(id)
  if (!typePerson) {
    return { error: 'Tipo de persona no encontrado' }
  }
  await typePerson.update({
    name: validation.data.name,
    base_price: validation.data.base_price,
  })
  return typePerson
}

export default serviceUpdateTypePerson 