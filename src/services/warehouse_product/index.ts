import createWarehouseProduct from './serviceCreateWHProducts'
import getAllWarehouseProducts from './serviceGetAllWHProducts'
import getWarehouseProductById from './serviceGetByIdWHProducts'
import getWarehouseProductsByWarehouse from './serviceGetByWarehouse_WHProducts'
import getWarehouseProductsByProduct from './serviceGetByProductWHProducts'
import updateWarehouseProduct from './serviceUpdateWHProducts'
import deleteWarehouseProduct from './serviceDeleteWHProducts'

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
