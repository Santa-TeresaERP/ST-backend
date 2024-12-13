import Egress from '@models/egress_model.js'
import { Request, Response } from 'express'

export class egressController {
  static async createEgress (req: Request, res: Response) {
    try {
     const { type } = req.params
      const { name, amount, supplier, date, total_price } = req.body

      const newEgress = await Egress.create({ name, amount, supplier, date, total_price, type })
      res.status(201).json(newEgress)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async getEgresses (req: Request, res: Response) {
    try {
     const { type } = req.params

      const egresses = await Egress.findAll({ where: { type } })
      res.status(200).json(egresses)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async deleteEgress (req: Request, res: Response) {
    try {
      const { type, id } = req.params

      const egress = await Egress.findOne({ where: { id, type } })
      if (!egress) {
        return res.status(404).json({ error: 'Egreso no encontrado' })
      }
      await egress.destroy()
      res.status(200).json({ message: 'Egreso eliminado con éxito' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async updateEgress (req: Request, res: Response) {
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
  }
}
