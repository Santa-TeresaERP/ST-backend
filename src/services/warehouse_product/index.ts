import createWarehouseProduct from './serviceCreate'
import getAllWarehouseProducts from './serviceGetAll'
import getWarehouseProductById from './serviceGetById'
import getWarehouseProductsByWarehouse from './serviceGetByWarehouse'
import getWarehouseProductsByProduct from './serviceGetByProduct'
import updateWarehouseProduct from './serviceUpdate'
import deleteWarehouseProduct from './serviceDelete'

const warehouseProductService = {
  createWarehouseProduct,
  getAllWarehouseProducts,
  getWarehouseProductById,
  getWarehouseProductsByWarehouse,
  getWarehouseProductsByProduct,
  updateWarehouseProduct,
  deleteWarehouseProduct,
}

export default warehouseProductService
