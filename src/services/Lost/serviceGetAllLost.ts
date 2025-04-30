import Lost from '@models/lost'
import Product from '@models/product'
import { Op, WhereOptions } from 'sequelize'

interface Filters {
  product_id?: string
  lost_type?: string
  start_date?: Date
  end_date?: Date
}

interface LostWhereConditions {
  product_id?: string
  lost_type?: string
  created_at?: {
    [Op.between]?: [Date, Date]
    [Op.gte]?: Date
    [Op.lte]?: Date
  }
}

export default async function getAllLost(filters?: Filters) {
  try {
    const where: WhereOptions<LostWhereConditions> = {}

    if (filters?.product_id) {
      where.product_id = filters.product_id
    }

    if (filters?.lost_type) {
      where.lost_type = filters.lost_type
    }

    if (filters?.start_date && filters?.end_date) {
      where.created_at = {
        [Op.between]: [filters.start_date, filters.end_date],
      }
    } else if (filters?.start_date) {
      where.created_at = {
        [Op.gte]: filters.start_date,
      }
    } else if (filters?.end_date) {
      where.created_at = {
        [Op.lte]: filters.end_date,
      }
    }

    const losts = await Lost.findAll({
      include: [Product],
      order: [['created_at', 'DESC']],
    })

    return losts
  } catch (error) {
    throw new Error(
      `Error al obtener registros de pérdida: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
