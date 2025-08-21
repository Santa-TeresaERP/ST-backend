import GeneralIncome from '@models/generalIncome'

/**
 * Elimina un registro de ingreso.
 * No permite la eliminación si el ingreso ya está asociado a un reporte financiero.
 */
const serviceDeleteGeneralIncome = async (id: string) => {
  try {
    const income = await GeneralIncome.findByPk(id)
    if (!income) {
      return { error: 'Ingreso no encontrado.' }
    }

    if (income.report_id) {
      return {
        error:
          'Este ingreso ya ha sido incluido en un reporte financiero y no puede ser eliminado.',
      }
    }

    await income.destroy()
    return { message: 'Ingreso eliminado correctamente.' }
  } catch (error) {
    console.error(`Error al eliminar el ingreso con ID ${id}:`, error)
    return { error: 'Ocurrió un error inesperado al eliminar el ingreso.' }
  }
}

export default serviceDeleteGeneralIncome
