import Lost from '@models/lost'
import Product from '@models/product'
import Production from '@models/production'
import { lostAttributes } from '@type/production/lost'

export default async function createLost(
  lostData: Omit<lostAttributes, 'id' | 'created_at'>,
) {
  try {
    const product = await Product.findByPk(lostData.production_id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }
    const newLost = await Lost.create({
      production_id: lostData.production_id,
      quantity: lostData.quantity,
      lost_type: lostData.lost_type,
      observations: lostData.observations ?? '',
      created_at: new Date(),
    })

    const production = await Production.findByPk(lostData.production_id)
    if (!production) {
      return { error: 'El registro de producción no existe' }
    }

    await production.update({
      quantityProduced: production.quantityProduced - lostData.quantity,
    })

    return newLost
  } catch (error) {
    throw new Error(
      `Error al crear registro de pérdida: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
