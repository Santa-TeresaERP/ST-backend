// services/Rentals/createRentalIncome.ts
import serviceCreateGeneralIncome from '@services/GeneralIncome/serviceCreateGeneralIncome'
import Module from '@models/modules'
import FinancialReport from '@models/financialReport'
import Rental from '@models/rental'
import Customer from '@models/customers'
import Place from '@models/places'
import User from '@models/user'
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome'
import { CustomerAttributes } from '@type/alquiler/customers'
import { PlaceAttributes } from '@type/alquiler/places'
import { UserAttributes } from '@type/user/auth'

// Extiende Rental con asociaciones tipadas (dos variantes por alias implícito de Sequelize)
type RentalWithAssociations = Rental & {
  customer?: Customer & Partial<CustomerAttributes>
  Customer?: Customer & Partial<CustomerAttributes>
  place?: Place & Partial<PlaceAttributes>
  Place?: Place & Partial<PlaceAttributes>
  user?: User & Partial<UserAttributes>
  User?: User & Partial<UserAttributes>
}

/**
 * Crea un registro de ingreso general relacionado al módulo "Alquileres"
 * cuando se crea un alquiler
 */
const createRentalIncome = async (rentalId: string) => {
  try {
    // 1) Módulo "Alquileres"
    const rentalsModule = await Module.findOne({
      where: { name: 'Alquileres' },
    })
    if (!rentalsModule) throw new Error('❌ Módulo "Alquileres" no encontrado')

    // 2) Reporte activo
    const activeReport = await FinancialReport.findOne({
      where: { status: 'proceso' },
      order: [['createdAt', 'DESC']],
    })

    // 3) Alquiler con asociaciones
    const rental = await Rental.findByPk(rentalId, {
      include: [
        { model: Customer, attributes: ['id', 'full_name'] }, // 👈 full_name
        { model: Place, attributes: ['id', 'name', 'area'] },
        { model: User, attributes: ['id', 'name', 'email'] },
      ],
    })
    if (!rental) throw new Error('❌ Alquiler no encontrado')

    const r = rental as RentalWithAssociations

    const customerObj = r.customer ?? r.Customer
    const placeObj = r.place ?? r.Place
    const userObj = r.user ?? r.User

    const customerName = customerObj?.full_name ?? 'Cliente' // 👈 usa full_name
    const placeName = placeObj?.name ?? 'Lugar'
    const placeArea = placeObj?.area ? ` (${placeObj.area})` : ''
    const sellerName = userObj?.name ?? 'Vendedor'

    // 4) DECIMAL → number
    const totalAmount = Number(rental.amount)

    // 5) Descripción
    const autoDescription =
      `Ingreso por alquiler: ${placeName}${placeArea} - ` +
      `Cliente: ${customerName} - Vendedor: ${sellerName} - ` +
      `Desde: ${new Date(rental.start_date).toISOString()} - ` +
      `Hasta: ${new Date(rental.end_date).toISOString()}`

    // 6) Payload ingreso
    const incomeData: GeneralIncomeAttributes = {
      module_id: rentalsModule.id,
      income_type: 'Alquiler',
      amount: totalAmount,
      date: new Date(),
      description: autoDescription,
      report_id: activeReport?.id || null,
    }

    console.log('🧾 Creando ingreso por alquiler:', incomeData)

    // 7) Crear ingreso
    const newIncome = await serviceCreateGeneralIncome(incomeData)
    console.log('✅ Ingreso por alquiler registrado correctamente')
    return newIncome
  } catch (error) {
    console.error('❌ Error creando ingreso por alquiler:', error)
    throw error
  }
}

export default createRentalIncome
