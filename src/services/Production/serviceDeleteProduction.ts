import Production from '@models/production'

const serviceDeleteProduction = async (id: string) => {
  const production = await Production.findByPk(id)

  if (!production) {
    return { error: 'El registro de producción no existe' }
  }

  await production.destroy()
  return { message: 'Registro de producción eliminado correctamente' }
}

export default serviceDeleteProduction
