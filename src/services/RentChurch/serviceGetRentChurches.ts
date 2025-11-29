import RentChurch from '@models/rentChurch'
import Church from '@models/church' // Importa el modelo correcto

const serviceGetRentChurches = async () => {
  const rents = await RentChurch.findAll({
    include: [
      {
        model: Church,
        as: 'church', // Asegúrate de que el alias coincida con el definido en la asociación
      },
    ],
  })
  return rents
}

export default serviceGetRentChurches
