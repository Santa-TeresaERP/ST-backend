import Overhead from '@models/overhead'

const serviceGetMonastery = async () => {
  try {
    const overheads = await Overhead.findAll({
      where: { type: 'monasterio' },
      order: [['createdAt', 'ASC']],
    })

    return overheads
  } catch (error) {
    console.error('Error al obtener gastos de monasterio:', error)
    throw error
  }
}

export default serviceGetMonastery
