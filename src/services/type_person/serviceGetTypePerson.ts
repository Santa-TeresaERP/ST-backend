import TypePerson from '@models/type_person'

const serviceGetTypePerson = async (id: string) => {
  const typePerson = await TypePerson.findByPk(id)
  if (!typePerson) {
    return { error: 'Tipo de persona no encontrado' }
  }
  return typePerson
}

export default serviceGetTypePerson 