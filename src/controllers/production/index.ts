import createProduction from './createProduction'
import getProductions from './getProductions'
import getProduction from './getProduction'
import updateProduction from './updateProduction'
import toggleProductionStatus from './updateStatusProduction'

const productionController = {
  createProduction,
  getProductions,
  getProduction,
  updateProduction,
  toggleProductionStatus,
}

export default productionController
