import TypePerson from '@models/type_person'

const serviceGetTypePersons = async () => {
  return await TypePerson.findAll()
}

export default serviceGetTypePersons
