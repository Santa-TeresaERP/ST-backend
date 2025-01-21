import Module from '@models/module'
import { ModuleAttributes } from '@type/modules'
import { modulesValidation } from 'src/schemas/modulesSchema'

class useModules {
  // Obtener todos los módulos
  static async getModules() {
    const modules = await Module.findAll()
    return modules
  }

  // Actualizar un módulo
  static async updateModule(id: string, body: ModuleAttributes) {
    const validation = modulesValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { name, description } = validation.data

    const module = await Module.findByPk(id)
    if (!module) {
      return { error: 'El módulo no existe' }
    }

    await module.update({ name, description })
    return module
  }
}

export default useModules
