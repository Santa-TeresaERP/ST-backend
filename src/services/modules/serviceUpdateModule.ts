import Module from '@models/modules'
import { ModuleAttributes } from '@type/user/modules'
import { modulesValidation } from 'src/schemas/user/modulesSchema'

// Actualizar un módulo
export async function serviceUpdateModule(id: string, body: ModuleAttributes) {
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
