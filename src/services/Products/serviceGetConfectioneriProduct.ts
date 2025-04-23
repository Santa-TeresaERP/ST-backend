import Product from '@models/product'
import Category from '@models/categories'

const serviceGetConfectioneriProduct = async () => {
  const confectioneryProducts = await Product.findAll({
    include: Category,
    where: {
      '$Category.name$': 'Food', // Asegúrate de que 'name' sea el campo que almacena el nombre de la categoría
    },
  })
  return confectioneryProducts

}

export default serviceGetConfectioneriProduct
