import BuysProduct from '@models/buysProduct'

const serviceGetBuysProductById = async (id: string) => {
  try {
    const product = await BuysProduct.findById(id)
    if (product === null || product === undefined) {
      throw new Error('BuysProduct not found')
    }
    return product
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching BuysProduct by ID: ${error.message}`)
    } else {
      throw new Error('Error fetching BuysProduct by ID: Unknown error')
    }
  }
}

export default serviceGetBuysProductById
