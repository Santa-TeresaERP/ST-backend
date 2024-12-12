import Egress from '../models/egress_model.js';

export const createEgress = async (req, res) => {
  const { type } = req.params;
  const { name, amount, supplier, date, total_price } = req.body;

  try {
    const newEgress = await Egress.create({ name, amount, supplier, date, total_price, type });
    res.status(201).json(newEgress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEgresses = async (req, res) => {
  const { type } = req.params;

  try {
    const egresses = await Egress.findAll({ where: { type } });
    res.status(200).json(egresses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEgress = async (req, res) => {
  const { type, id } = req.params;

  try {
    const egress = await Egress.findOne({ where: { id, type } });
    if (!egress) {
      return res.status(404).json({ error: 'Egreso no encontrado' });
    }
    await egress.destroy();
    res.status(200).json({ message: 'Egreso eliminado con éxito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateEgress = async (req, res) => {
  const { type, id } = req.params;
  const { name, amount, supplier, date, total_price } = req.body;

  try {
    const egress = await Egress.findOne({ where: { id, type } });
    if (!egress) {
      return res.status(404).json({ error: 'Egreso no encontrado' });
    }
    egress.name = name || egress.name;
    egress.amount = amount || egress.amount;
    egress.supplier = supplier || egress.supplier;
    egress.date = date || egress.date;
    egress.total_price = total_price || egress.total_price;

    await egress.save();
    res.status(200).json(egress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
