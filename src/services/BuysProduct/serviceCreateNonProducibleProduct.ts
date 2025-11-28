import Product from '@models/product'
import Category from '@models/categories'
import { buysProductAttributes } from '@type/almacen/buys_product'

interface CreateNonProducibleProductInput {
  name: string
  category_id: string
  price: number
  description?: string
  buysProductData?: buysProductAttributes
}

/**
 * Servicio para crear un producto no producible a partir de datos de compra
 * Los productos no producibles son comprados (no se producen internamente)
 * @param body Datos para crear el producto no producible
 * @returns Nuevo producto creado o error
 */
const serviceCreateNonProducibleProduct = async (
  body: CreateNonProducibleProductInput,
) => {
  const callId = Date.now().toString(36) + Math.random().toString(36).slice(2)
  console.log(`🎯 [${callId}] INICIO serviceCreateNonProducibleProduct`)

  try {
    const { name, category_id, price, description, buysProductData } = body

    // Validar que la categoría existe
    const categoryExists = await Category.findByPk(category_id)
    if (!categoryExists) {
      console.warn(`⚠️ [${callId}] Categoría no encontrada: ${category_id}`)
      return {
        success: false,
        error: 'La categoría no existe',
      }
    }

    // Validar que el producto no exista ya
    const existingProduct = await Product.findOne({
      where: { name, category_id },
    })
    if (existingProduct) {
      console.warn(
        `⚠️ [${callId}] Producto no producible ya existe: ${existingProduct.id}`,
      )
      return {
        success: false,
        error: 'Un producto con este nombre ya existe en esta categoría',
        existingProduct: existingProduct.id,
      }
    }

    // Crear el producto con producible = false
    const newProduct = await Product.create({
      name,
      category_id,
      price,
      description: description ?? '',
      imagen_url: '',
      producible: false, // Marcado como NO producible
      status: true,
    })

    console.log(
      `✅ [${callId}] Producto no producible creado: ${newProduct.id}`,
    )

    if (buysProductData) {
      console.log(`📝 [${callId}] Datos de compra asociados:`, {
        supplier_id: buysProductData.supplier_id,
        quantity: buysProductData.quantity,
        unit_price: buysProductData.unit_price,
      })
    }

    return {
      success: true,
      product: newProduct,
      message: 'Producto no producible creado exitosamente',
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ [${callId}] Error:`, error.message)
      return {
        success: false,
        error: 'Error al crear el producto no producible',
        details: error.message,
        stack: error.stack,
      }
    }
    return {
      success: false,
      error: 'Error desconocido al crear el producto no producible',
    }
  }
}

export default serviceCreateNonProducibleProduct
