import Category from '@models/categories'
import { CategoryAttributes } from '@type/category'
import { categoriesValidation } from 'src/schemas/categoriesSchema'

class useCategories {
  // Crear una categoría
  static async createCategory(body: CategoryAttributes) {
    const validation = categoriesValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { name, description = '' } = validation.data

    const existingCategory = await Category.findOne({ where: { name } })
    if (existingCategory) {
      return { error: 'La categoría ya existe' }
    }

    const newCategory = await Category.create({ name, description })
    return newCategory
  }

  // Obtener todas las categorías
  static async getCategories() {
    const categories = await Category.findAll()
    return categories
  }

  // Actualizar una categoría
  static async updateCategory(id: string, body: CategoryAttributes) {
    const validation = categoriesValidation(body)

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
