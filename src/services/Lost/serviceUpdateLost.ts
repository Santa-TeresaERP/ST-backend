import Lost from '@models/lost'
import Product from '@models/product'
import { lostAttributes } from '@type/production/lost'

export default async function updateLost(
  id: string,
  updateData: Partial<Omit<lostAttributes, 'id' | 'created_at'>>,
) {
  try {
    const lost = await Lost.findByPk(id)
    if (!lost) {
      throw new Error('Registro de pérdida no encontrado')
    }

    if (updateData.production_id) {
      const product = await Product.findByPk(updateData.production_id)
      if (!product) {
        throw new Error('Producto no encontrado')
      }
    }

    await lost.update(updateData)
    return lost
  } catch (error) {
    throw new Error(
      `Error al actualizar registro de pérdida: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
