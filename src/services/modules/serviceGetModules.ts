import Module from '@models/modules'

export async function serviceGetModules() {
  const modules = await Module.findAll()
  return modules
}
