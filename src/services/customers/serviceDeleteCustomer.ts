import Customer from '@models/customers'

const deleteCustomer = async (id: string) => {
  try {
    const customer = await Customer.findByPk(id)
    if (!customer) {
      return {
        success: false,
        message: 'Cliente no encontrado',
      }
    }
    await customer.destroy()

    return {
      success: true,
      message: 'Cliente eliminado exitosamente',
    }
  } catch (error: unknown) {
    const err = error as { message?: string }
    return {
      success: false,
      message: 'Error al eliminar el cliente',
      error: err.message,
    }
  }
}

export default deleteCustomer
