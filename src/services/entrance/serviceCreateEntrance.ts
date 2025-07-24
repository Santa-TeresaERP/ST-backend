import Entrance from '@models/entrance'
import User from '@models/user'
import TypePerson from '@models/type_person'
import SalesChannel from '@models/sales_channel'
import PaymentMethod from '@models/payment_metod'
import { entranceAttributes } from '@type/museo/entrance'
import { entranceValidation } from 'src/schemas/museo/entrance'

const serviceCreateEntrance = async (body: entranceAttributes) => {
  try {
    const validation = entranceValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { user_id, type_person_id, sale_channel, payment_method } =
      validation.data

    // Validar que el usuario existe
    const user = await User.findByPk(user_id)
    if (!user) {
      return { error: 'El usuario especificado no existe' }
    }

    // Validar que el tipo de persona existe
    const typePerson = await TypePerson.findByPk(type_person_id)
    if (!typePerson) {
      return { error: 'El tipo de persona especificado no existe' }
    }

    // Validar que el canal de venta existe
    const salesChannel = await SalesChannel.findByPk(sale_channel)
    if (!salesChannel) {
      return { error: 'El canal de venta especificado no existe' }
    }

    // Validar que el método de pago existe
    const paymentMethodRecord = await PaymentMethod.findByPk(payment_method)
    if (!paymentMethodRecord) {
      return { error: 'El método de pago especificado no existe' }
    }

    const newEntrance = await Entrance.create(validation.data)
    return newEntrance
  } catch (error) {
    console.error('Error al crear entrada:', error)

    // Manejar errores de restricción de clave foránea
    if (error instanceof Error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        if (error.message.includes('user_id')) {
          return { error: 'El usuario especificado no existe' }
        }
        if (error.message.includes('type_person_id')) {
          return { error: 'El tipo de persona especificado no existe' }
        }
        if (error.message.includes('sale_channel')) {
          return { error: 'El canal de venta especificado no existe' }
        }
        if (error.message.includes('payment_method')) {
          return { error: 'El método de pago especificado no existe' }
        }
        return {
          error:
            'Error de referencia: uno o más campos referencian datos que no existen',
        }
      }

      return {
        error: 'Error al crear la entrada',
        details: error.message,
      }
    }

    return { error: 'Error desconocido al crear la entrada' }
  }
}

export default serviceCreateEntrance
