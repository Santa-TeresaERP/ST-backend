import create from './createWHProducts'
import getAll from './getAllWHProducts'
import getById from './getByIdWHProducts'
import getByWarehouse from './getByWarehouse_WHProducts'
import getByProduct from './getByProduct_WHProducts'
import update from './updateWHProducts'
import deleteWarehouseProduct from './deleteWHProducts'

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
