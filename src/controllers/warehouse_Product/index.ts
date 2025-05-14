import create from './create'
import getAll from './getAll'
import getById from './getById'
import getByWarehouse from './getByWarehouse'
import getByProduct from './getByProduct'
import update from './update'
import deleteWarehouseProduct from './delete'

const warehouseProductController = {
  createWarehouseProduct: create,
  getAllWarehouseProducts: getAll,
  getWarehouseProductById: getById,
  getWarehouseProductsByWarehouse: getByWarehouse,
  getWarehouseProductsByProduct: getByProduct,
  updateWarehouseProduct: update,
  deleteWarehouseProduct,
}

export default warehouseProductController
