import Return from '@models/returns'

const serviceGetReturn = async (id: string) => {
  const data = await Return.findByPk(id).catch((error) => {
    return { error: 'Error al obtener devolución', details: error.message }
  })

  if (!data) return { error: 'Devolución no encontrada' }

  return data
}

export default serviceGetReturn
