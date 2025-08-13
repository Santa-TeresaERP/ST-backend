import GeneralIncome from '@models/generalIncome'
import Module from '@models/modules' // Para incluir el nombre del módulo

/**
 * Obtiene todos los registros de ingresos.
 * Incluye el nombre del módulo que originó el ingreso.
 * Ordena los ingresos por fecha descendente.
 */
const serviceGetAllGeneralIncomes = async () => {
  try {
    const incomes = await GeneralIncome.findAll({
      include: [
        {
          model: Module,
          attributes: ['name'], // Solo traemos el nombre para eficiencia
        },
      ],
      order: [['date', 'DESC']],
    })
    return incomes
  } catch (error) {
    console.error('Error al obtener los ingresos:', error)
    return { error: 'Ocurrió un error inesperado al obtener los ingresos.' }
  }
}

export default serviceGetAllGeneralIncomes
