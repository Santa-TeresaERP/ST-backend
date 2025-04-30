import Lost from '@models/lost'
import Product from '@models/product'

export default async function getLostById(id: string) {
  try {
    const lost = await Lost.findByPk(id, {
      include: [Product],
    })

    if (!lost) {
      throw new Error('Registro de pérdida no encontrado')
    }

    return lost
  } catch (error) {
    throw new Error(
      `Error al obtener registro de pérdida: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
