import Module from '@models/module'
import { ModulesAttributes } from '@type/modules'
import { modulesValidation } from 'src/schemas/modulesSchema'

class useModule {
  static async createModule(body: ModulesAttributes) {
    const validation = modulesValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { name } = body

    const existingModule = await Module.findOne({
      where: {
        name,
      },
    })

    if (existingModule) {
      return { error: 'El módulo ya existe' }
    }

    const newModule = await Module.create({
      name,
    })

    return newModule
  }

  static async getModules() {
    const modules = await Module.findAll()
    return modules
  }

  static async deleteModule(id: number) {
    const module = await Module.findByPk(id)
    if (!module) {
      return null
    }

    await module.destroy()
    return { message: 'Módulo eliminado correctamente' }
  }

  static async updateModule(id: number, body: ModulesAttributes) {
    const validation = modulesValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const module = await Module.findByPk(id)
    if (!module) {
      return null
    }

    await module.update(body)
    return module
  }
}

export default useModule
