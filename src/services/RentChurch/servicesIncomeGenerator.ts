import GeneralIncome from '@models/generalIncome'
import Module from '@models/modules'
import { RentChurchAttributes } from '@type/iglesia/rentChurch'

const getModuleIdByName = async (name: string): Promise<string> => {
  // 1. Consultar la tabla Module para obtener el ID real
  const moduleData = await Module.findOne({
    where: { name: name },
    attributes: ['id'],
  })

  if (!moduleData) {
    throw new Error(
      `Módulo con nombre '${name}' no encontrado en la base de datos.`,
    )
  }

  return moduleData.id
}

const serviceCreateGeneralIncome = async (
  rentData: RentChurchAttributes,
): Promise<GeneralIncome> => {
  try {
    // 1. Obtener el ID del módulo 'iglesia' de la DB (fiabilidad del primer ejemplo)
    const moduleIglesiaId = await getModuleIdByName('iglesia')

    // 2. Mapeo de datos
    const incomeDate = new Date(rentData.startTime)

    const generalIncomeData = {
      module_id: moduleIglesiaId,
      income_type: 'donaciones',
      amount: rentData.price,
      date: incomeDate,
      description: `Ingreso de renta de iglesia: ${rentData.name} (${rentData.startTime})`,
      report_id: null,
    }

    // 3. Crear el registro
    const generalIncome = await GeneralIncome.create(generalIncomeData)

    return generalIncome
  } catch (error) {
    console.error('Error al crear GeneralIncome desde RentChurch:', error)
    throw new Error(
      'No se pudo registrar el ingreso general (Verifique la existencia del módulo "iglesia").',
    )
  }
}

export default serviceCreateGeneralIncome
