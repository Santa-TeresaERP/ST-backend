import { Op } from 'sequelize'
import Return from '@models/returns'
import Sale from '@models/sale'
import BuysResource from '@models/buysResource'
import Production from '@models/production'
import Lost from '@models/lost'
import Resource from '@models/resource'
import Product from '@models/product'
import SaleDetail from '@models/saleDetail'

export const getDataDeVentas = async (startDate: string, endDate: string) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    const filters = {
      createdAt: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    }

    const buysResources = await BuysResource.findAll({
      where: filters,
      include: [{ model: Resource, as: 'resource', attributes: ['name'] }],
    })

    const productions = await Production.findAll({
      where: filters,
      include: [{ model: Product, attributes: ['name'] }], // Production → Product
    })
    const losts = await Lost.findAll({
      where: filters,
      include: [
        {
          model: Production,
          as: 'production',
          attributes: ['id'],
          include: [{ model: Product, attributes: ['name'] }],
        },
      ],
    })

    const sales = await Sale.findAll({
      where: filters,
      include: [
        {
          model: SaleDetail,
          as: 'saleDetails',
          include: [{ model: Product, as: 'product', attributes: ['name'] }],
        },
      ],
    })

    const returns = await Return.findAll({
      where: filters,
      include: [{ model: Product, as: 'product', attributes: ['name'] }],
    })

    return {
      success: true as const,
      message: 'Datos de ventas obtenidos correctamente',
      data: {
        buysResources,
        productions,
        losts,
        sales,
        returns,
      },
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getDataDeVentas'

    return {
      success: false as const,
      message: `Error en getDataDeVentas: ${message}`,
    }
  }
}
