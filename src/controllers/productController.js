import Producto from '../models/product_groceries_model.js';


export const createProduct = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const [updated] = await Producto.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const productoActualizado = await Producto.findByPk(req.params.id);
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Producto.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
