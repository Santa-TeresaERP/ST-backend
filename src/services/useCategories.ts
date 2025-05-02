import Category from '@models/categories'
import Product from '@models/product'
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
      const categories = await Category.findAll({
        include: [Product], // Si incluyes productos relacionados
      })
      return categories
    } catch (error) {
      console.error('Error in getCategories service:', error)
      throw error
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
    const category = await Category.findByPk(id)

    if (!category) {
      return { error: 'La categoría no existe' }
    }

    await category.destroy()
    return { message: 'Categoría eliminada correctamente' }
  }
}

export default useCategories
