import createCustomer from './serviceCreateCustomer'
import getAllCustomers from './serviceGetAllCustomers'
import getCustomerById from './serviceGetCustomerById'
import updateCustomer from './serviceUpdateCustomer'
import deleteCustomer from './serviceDeleteCustomer'

const useCustomers = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}

export default useCustomers
