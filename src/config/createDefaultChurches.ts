import Church from '@models/church'

/**
 * Crea las iglesias predeterminadas en la base de datos.
 * @param {object} options - Opciones para la creación.
 * @param {boolean} options.clean - Si es true, borra todas las iglesias antes de crear las nuevas.
 */
const createDefaultChurches = async (options = { clean: false }) => {
  try {
    // Definimos las iglesias por defecto
    const defaultChurches = [
      {
        name: 'Iglesia Monasterio',
        location: 'Monasterio de Santa Catalina de Siena',
        state: true,
        status: true,
      },
    ]

    if (options.clean) {
      // truncate: true reinicia los contadores de ID si fuera integer,
      // con UUID limpia la tabla eficientemente.
      await Church.destroy({ where: {}, truncate: false })
      console.log('🗑️ Iglesias anteriores eliminadas.')
    }

    const createdChurches = await Promise.all(
      defaultChurches.map((churchData) =>
        Church.findOrCreate({
          where: { name: churchData.name },
          defaults: churchData,
        }),
      ),
    )

    console.log('✅ Iglesias creadas/verificadas correctamente')

    // findOrCreate devuelve [instancia, creado(boolean)], mapeamos para devolver solo la instancia
    return createdChurches.map(([church]) => church)
  } catch (err) {
    console.error('❌ Error al crear iglesias por defecto:', err)
    throw err
  }
}

export default createDefaultChurches
