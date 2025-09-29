import Overhead from '@models/overhead'

const serviceGetOverheads = async () => {
  try {
    // Cambiamos a findAll para obtener todos los overheads activos
    const overheads = await Overhead.findAll({
      where: { status: true }, // Usar boolean true, no string 'true'
      order: [['createdAt', 'DESC']],
    })

    // Retornamos la lista, incluso si está vacía
    return overheads
  } catch (error) {
    console.error(`❌ Error fetching overheads:`, error)
    // En lugar de lanzar el error, retornamos array vacío
    return []
  }
}

export default serviceGetOverheads
