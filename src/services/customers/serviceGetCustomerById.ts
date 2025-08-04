import Customer from '@models/customers'

const getCustomerById = async (id: string) => {
  try {
    const customer = await Customer.findByPk(id)
    if (!customer) {
      return {
        success: false,
        message: 'Cliente no encontrado',
      }
    }
    return {
      success: true,
      data: customer,
      message: 'Cliente obtenido exitosamente',
    }
  } catch (error: unknown) {
    const err = error as { message?: string }
    return {
      success: false,
      message: 'Error al obtener el cliente',
      error: err.message,
    }
  }
}

export default getCustomerById
