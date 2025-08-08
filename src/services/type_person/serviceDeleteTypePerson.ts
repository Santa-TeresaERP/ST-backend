import TypePerson from '@models/type_person'
import Entrance from '@models/entrance'

const serviceDeleteTypePerson = async (id: string) => {
  try {
    const typePerson = await TypePerson.findByPk(id)
    if (!typePerson) {
      return { error: 'Tipo de persona no encontrado' }
    }

    // Verificar si existen entradas que referencien este tipo de persona
    const associatedEntrances = await Entrance.findAll({
      where: { type_person_id: id },
    })

    if (associatedEntrances.length > 0) {
      return {
        error:
          'No se puede eliminar el tipo de persona porque tiene entradas asociadas',
      }
    }

    await typePerson.destroy()
    return { message: 'Tipo de persona eliminado correctamente' }
  } catch (error) {
    console.error('Error al eliminar tipo de persona:', error)

    // Manejar error de restricción de clave foránea
    if (error instanceof Error) {
      if (
        error.message.includes('FOREIGN KEY constraint') ||
        error.message.includes('violates foreign key constraint') ||
        error.message.includes('constraint fails')
      ) {
        return {
          error:
            'No se puede eliminar el tipo de persona porque tiene registros asociados',
        }
      }
      return {
        error: 'Error al eliminar el tipo de persona',
        details: error.message,
      }
    }

    return { error: 'Error desconocido al eliminar el tipo de persona' }
  }
}

export default serviceDeleteTypePerson
