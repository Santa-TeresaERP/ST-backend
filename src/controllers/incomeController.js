import Income from '../models/Ingress_model.js'
import Product from '../models/product_groceries_model.js'

export const createIncome = async (req, res) => {
  const { type } = req.params
  const { id_producto, amount, total_price } = req.body

  try {
    const product = await Product.findByPk(id_producto)
    if (!product || product.type !== type) {
      return res
        .status(404)
        .json({ error: 'Producto no encontrado o el tipo no coincide' })
    }

    const newIncome = await Income.create({
      id_producto,
      amount,
      total_price,
      type,
    })
    res.status(201).json(newIncome)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getIncomes = async (req, res) => {
  const { type } = req.params

  try {
    const incomes = await Income.findAll({
      where: { type },
      include: { model: Product, attributes: ['name'] },
    })
    res.status(200).json(incomes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteIncome = async (req, res) => {
  const { type, id } = req.params

  try {
    const income = await Income.findOne({ where: { id, type } })
    if (!income) {
      return res.status(404).json({ error: 'Ingreso no encontrado' })
    }
    await income.destroy()
    res.status(200).json({ message: 'Ingreso eliminado correctamente' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const updateIncome = async (req, res) => {
  const { type, id } = req.params
  const { amount, total_price } = req.body

  try {
    const income = await Income.findOne({ where: { id, type } })
    if (!income) {
      return res.status(404).json({ error: 'Ingreso no encontrado' })
    }
    income.amount = amount || income.amount
    income.total_price = total_price || income.total_price

    await income.save()
    res.status(200).json(income)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
