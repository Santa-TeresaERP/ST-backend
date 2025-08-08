import CreateCustomerController from './createCustomerController'
import GetAllCustomersController from './getAllCustomersController'
import GetCustomerByIdController from './getCustomerByIdController'
import UpdateCustomerController from './updateCustomerController'
import DeleteCustomerController from './deleteCustomerController'

const customersController = {
  create: CreateCustomerController.create,
  getAll: GetAllCustomersController.getAll,
  getById: GetCustomerByIdController.getById,
  update: UpdateCustomerController.update,
  delete: DeleteCustomerController.delete,
}

export default customersController
