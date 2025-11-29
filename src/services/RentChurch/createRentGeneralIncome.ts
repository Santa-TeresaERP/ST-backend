import Module from '@models/modules'
import serviceCreateGeneralIncome from '@services/GeneralIncome/serviceCreateGeneralIncome'
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome'
import { RentChurchAttributes } from '@type/alquiler/rentChurch'

const CHURCH_MODULE_NAME = 'Iglesia'

/**
 * Crea un registro en GENERAl_INCOME a partir de los datos de una reserva de iglesia.
 */
const createRentGeneralIncome = async (rentData: RentChurchAttributes) => {
  const module = await Module.findOne({ where: { name: CHURCH_MODULE_NAME } })

  if (!module) {
    throw new Error(`No se encontró el módulo "${CHURCH_MODULE_NAME}".`)
  }

  const amount = Number(rentData.price ?? 0)
  const description = `Reserva ${rentData.type} - ${rentData.name} (${rentData.startTime} - ${rentData.endTime})`

  const payload: GeneralIncomeAttributes = {
    module_id: module.id,
    income_type: `alquiler_${rentData.type}`,
    amount,
    date: new Date(rentData.date),
    description,
  }

  const result = await serviceCreateGeneralIncome(payload)

  if ((result as any)?.error) {
    throw new Error((result as any).error)
  }

  return result
}

export default createRentGeneralIncome
