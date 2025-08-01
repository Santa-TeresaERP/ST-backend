import Customer from '@models/customers'
import { CustomerAttributes } from '@type/alquiler/customers'

const createCustomer = async (customerData: Omit<CustomerAttributes, 'id'>) => {
  try {
    const newCustomer = await Customer.create(customerData)
    return {
      success: true,
      data: newCustomer,
      message: 'Cliente creado exitosamente',
    }
  } catch (error: unknown) {
    const err = error as {
      name?: string
      errors?: Array<{ path?: string }>
      message?: string
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      const field = err.errors?.[0]?.path
      let message = 'Ya existe un cliente con este '
      switch (field) {
        case 'dni':
          message += 'DNI'
          break
        case 'phone':
          message += 'teléfono'
          break
        case 'email':
          message += 'email'
          break
        default:
          message = 'Ya existe un cliente con estos datos'
      }
      return {
        success: false,
        message,
        error: err.message,
      }
    }
    return {
      success: false,
      message: 'Error al crear el cliente',
      error: err.message,
    }
  }
}

export default createCustomer
