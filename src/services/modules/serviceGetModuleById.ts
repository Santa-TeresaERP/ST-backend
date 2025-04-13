import Module from '@models/modules'

// Obtener un módulo por su ID
export async function serviceGetModuleById(id: string) {
  const module = await Module.findByPk(id)
  if (!module) {
    return { error: 'El módulo no existe' }
  }

  return module
}
