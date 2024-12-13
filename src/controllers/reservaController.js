import Reserva from '../models/reserve_model.js'
import Local from '../models/local_model.js'

export const crearReserva = async (req, res) => {
  try {
    const reserva = await Reserva.create(req.body)
    res.status(201).json(reserva)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({ include: Local })
    res.status(200).json(reservas)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params
    const reserva = await Reserva.findByPk(id)
    if (reserva) {
      await reserva.update(req.body)
      res.status(200).json(reserva)
    } else {
      res.status(404).json({ error: 'Reserva no encontrada' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params
    const reserva = await Reserva.findByPk(id)
    if (reserva) {
      await reserva.destroy()
      res.status(200).json({ message: 'Reserva eliminada' })
    } else {
      res.status(404).json({ error: 'Reserva no encontrada' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
