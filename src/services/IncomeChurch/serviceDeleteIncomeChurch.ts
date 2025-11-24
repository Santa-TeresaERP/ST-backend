import IncomeChurch from '@models/IncomeChurch'

// Recibimos 'id' (el identificador único del ingreso), no el de la iglesia
const serviceDeleteIncomeChurch = async (id: string) => {
  try {
    // 1. Buscar el ingreso específico por su Primary Key (ID)
    const income = await IncomeChurch.findByPk(id)

    // 2. Verificar si existe
    if (!income) {
      return {
        success: false,
        error: 'No se encontró el ingreso con el ID especificado.',
      }
    }

    // 3. Eliminar ese registro específico
    // Al ejecutar destroy sobre la instancia 'income', solo se borra esa fila.
    await income.destroy()

    // 4. Respuesta exitosa
    return {
      success: true,
      message: 'Ingreso eliminado exitosamente.',
      deletedCount: 1,
    }
  } catch (error) {
    console.error('Error al eliminar el ingreso:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al eliminar el ingreso.',
    }
  }
}

export default serviceDeleteIncomeChurch
