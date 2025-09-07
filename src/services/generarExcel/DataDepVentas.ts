import { Op } from 'sequelize'
import Return from '@models/returns'
import Sale from '@models/sale'
import BuysResource from '@models/buysResource'
import Production from '@models/production'
import Lost from '@models/lost'

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

    const buysResources = await BuysResource.findAll({ where: filters })
    const productions = await Production.findAll({ where: filters })
    const losts = await Lost.findAll({ where: filters })
    const sales = await Sale.findAll({ where: filters })
    const returns = await Return.findAll({ where: filters })

    return {
      success: true,
      message: 'Datos de ventas obtenidos correctamente',
      data: {
        buysResources,
        productions,
        losts,
        sales,
        returns,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error en getDataDeVentas: ${error.message}`,
    }
  }
}
