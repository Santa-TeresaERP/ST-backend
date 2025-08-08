import createGeneralIncomeController from './createGeneralIncomeController'
import getAllGeneralIncomesController from './getAllGeneralIncomesController'
import getGeneralIncomeByIdController from './getGeneralIncomeByIdController'
import updateGeneralIncomeController from './updateGeneralIncomeController'
import deleteGeneralIncomeController from './deleteGeneralIncomeController'

const generalIncomeController = {
  create: createGeneralIncomeController,
  getAll: getAllGeneralIncomesController,
  getById: getGeneralIncomeByIdController,
  update: updateGeneralIncomeController,
  delete: deleteGeneralIncomeController,
}

export default generalIncomeController
