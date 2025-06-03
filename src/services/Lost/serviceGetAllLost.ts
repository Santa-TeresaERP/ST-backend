import Lost from '@models/lost'

export default async function getAllLost() {
  try {
    const losts = await Lost.findAll()

    return losts
  } catch (error) {
    throw new Error(
      `Error al obtener registros de pérdida: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
