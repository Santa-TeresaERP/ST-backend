
import IncomeChurch from '@models/IncomeChurch'

const serviceUpdateIncomeChurch = async (
  id: string,
  data: Partial<IncomeChurch>,
) => {
  try {
    const income = await IncomeChurch.findByPk(id)

    if (!income) {
      return {
        success: false,
        error: `Ingreso con ID ${id} no encontrado.`,
      }
    }

    await income.update(data)

    return {
      success: true,
      message: `Ingreso con ID ${id} actualizado exitosamente.`,
      income,
    }
  } catch (error) {
    console.error('Error al actualizar el ingreso de la iglesia:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al actualizar el ingreso de la iglesia.',
    }
  }
}

export default serviceUpdateIncomeChurch
