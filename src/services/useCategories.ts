import Category from '@models/categories'
import Product from '@models/product' // Importa el modelo de productos
import { CategoryAttributes } from '@type/production/categories'
import { categoryValidation } from 'src/schemas/production/categoriesSchema'

class useCategories {
  // Crear una categoría
  static async createCategory(body: CategoryAttributes) {
    try {
      const validation = categoryValidation(body)

      if (!validation.success) {
        return { error: validation.error.errors }
      }

      const { name, description = '' } = validation.data

      // Verifica si ya existe una categoría con el mismo nombre
      const existingCategory = await Category.findOne({ where: { name } })
      if (existingCategory) {
        return { error: 'La categoría ya existe' }
      }

      // Crea la nueva categoría
      const newCategory = await Category.create({ name, description })
      return newCategory
    } catch (error) {
      console.error('Error in createCategory service:', error)
      throw error
    }
  }

  // Obtener todas las categorías
  static async getCategories() {
    try {
      const categories = await Category.findAll()
      return categories
    } catch (error) {
      console.error('Error al obtener categorías:', error)
      throw new Error('Error al obtener categorías')
    }
  }

  // Actualizar una categoría
  static async updateCategory(id: string, body: CategoryAttributes) {
    const validation = categoryValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const category = await Category.findByPk(id)
    if (!category) {
      return { error: 'La categoría no existe' }
    }

    const { name, description } = validation.data

    await category.update({ name, description })
    return category
  }

  // Eliminar una categoría
  static async deleteCategory(id: string) {
    try {
      const category = await Category.findByPk(id)

      if (!category) {
        return { error: 'La categoría no existe' }
      }

      // Verifica si la categoría tiene productos asociados
      const associatedProducts = await Product.findAll({
        where: { category_id: id },
      })
      if (associatedProducts.length > 0) {
        return {
          error:
            'No se puede eliminar la categoría porque tiene productos asociados.',
        }
      }

      // Elimina la categoría
      await category.destroy()
      return { message: 'Categoría eliminada correctamente' }
    } catch (error) {
      console.error('Error en deleteCategory service:', error)
      throw new Error('Error interno del servidor')
    }
  }
}

export default useCategories
