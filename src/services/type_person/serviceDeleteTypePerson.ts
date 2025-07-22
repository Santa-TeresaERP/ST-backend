import TypePerson from '@models/type_person'

const serviceDeleteTypePerson = async (id: string) => {
  const typePerson = await TypePerson.findByPk(id)
  if (!typePerson) {
    return { error: 'Tipo de persona no encontrado' }
  }
  await typePerson.destroy()
  return { message: 'Tipo de persona eliminado correctamente' }
}

export default serviceDeleteTypePerson
