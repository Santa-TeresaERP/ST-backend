import Local from '../models/local_model.js'

export const crearLocal = async (req, res) => {
  try {
    const local = await Local.create(req.body)
    res.status(201).json(local)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const obtenerLocales = async (req, res) => {
  try {
    const locales = await Local.findAll()
    res.status(200).json(locales)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const actualizarLocal = async (req, res) => {
  try {
    const { id } = req.params
    const local = await Local.findByPk(id)
    if (local) {
      await local.update(req.body)
      res.status(200).json(local)
    } else {
      res.status(404).json({ error: 'Local no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const eliminarLocal = async (req, res) => {
  try {
    const { id } = req.params
    const local = await Local.findByPk(id)
    if (local) {
      await local.destroy()
      res.status(200).json({ message: 'Local eliminado' })
    } else {
      res.status(404).json({ error: 'Local no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
