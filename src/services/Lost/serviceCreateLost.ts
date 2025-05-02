import Lost from '@models/lost'
import Product from '@models/product'
import { lostAttributes } from '@type/production/lost'

export default async function createLost(
  lostData: Omit<lostAttributes, 'id' | 'created_at'>,
) {
  try {
    const product = await Product.findByPk(lostData.product_id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }
    const newLost = await Lost.create({
      ...lostData,
      created_at: new Date(),
    })
    return newLost
  } catch (error) {
    throw new Error(
      `Error al crear registro de pérdida: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
