// Asegúrate de que la ruta al modelo sea la correcta.
// Si tu archivo se llama 'Store.js' o 'store.js', esta ruta debería funcionar.
import Store from '@models/store'

/**
 * Crea las tiendas predeterminadas en la base de datos.
 * @param {object} options - Opciones para la creación.
 * @param {boolean} options.clean - Si es true, borra todas las tiendas antes de crear las nuevas.
 */
const createStoreIglesia = async (options = { clean: false }) => {
  try {
    // Definimos las tiendas usando los campos de tu modelo
    const stores = [
      {
        store_name: 'Iglesio',
        address: '',
        observations: 'Esta es la sede Iglesia.',
      },
    ]

    if (options.clean) {
      await Store.destroy({ where: {} })
      console.log('Tiendas anteriores eliminadas.')
    }

    const createdStores = await Promise.all(
      stores.map(({ store_name, address, observations }) =>
        Store.findOrCreate({
          where: { store_name },
          defaults: { store_name, address, observations },
        }),
      ),
    )

    console.log('Tiendas creadas correctamente')

    return createdStores.map(([store]) => store)
  } catch (err) {
    console.error('Error al crear tiendas:', err)
    throw err
  }
}

export default createStoreIglesia
