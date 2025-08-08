import createGeneralExpenseController from './createGeneralExpenseController'
import getAllGeneralExpensesController from './getAllGeneralExpensesController'
import getGeneralExpenseByIdController from './getGeneralExpenseByIdController'
import updateGeneralExpenseController from './updateGeneralExpenseController'
import deleteGeneralExpenseController from './deleteGeneralExpenseController'

const generalExpenseController = {
  create: createGeneralExpenseController,
  getAll: getAllGeneralExpensesController,
  getById: getGeneralExpenseByIdController,
  update: updateGeneralExpenseController,
  delete: deleteGeneralExpenseController,
}

export default generalExpenseController
