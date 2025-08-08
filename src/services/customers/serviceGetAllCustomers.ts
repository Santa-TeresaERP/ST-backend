import Customer from '@models/customers'

const getAllCustomers = async () => {
  try {
    const customers = await Customer.findAll({
      order: [['createdAt', 'DESC']],
    })
    return {
      success: true,
      data: customers,
      message: 'Clientes obtenidos exitosamente',
    }
  } catch (error: unknown) {
    const err = error as { message?: string }
    return {
      success: false,
      message: 'Error al obtener los clientes',
      error: err.message,
    }
  }
}

export default getAllCustomers
