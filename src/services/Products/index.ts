import serviceCreateProduct from './serviceCreateProduct'
import serviceGetAllProduct from './serviceGetAllProduct'
import serviceGetProductByID from './serviceGetProductByID'
import serviceUpdateProduct from './serviceUpdateProduct'
import serviceDeleteProduct from './serviceDeleteProduct'

const useProducts = {
  createProduct: serviceCreateProduct,
  getAllProduct: serviceGetAllProduct,
  getProductByID: serviceGetProductByID,
  updateProduct: serviceUpdateProduct,
  deleteProduct: serviceDeleteProduct,
}

export default useProducts
