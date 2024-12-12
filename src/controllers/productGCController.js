
import ProductoManualidad from '../models/product_craft_model.js';

export const crearProductoManualidad = async (req, res) => {
    try {
        const producto = await ProductoManualidad.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const obtenerProductosManualidades = async (req, res) => {
    try {
        const productos = await ProductoManualidad.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const actualizarProductoManualidad = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await ProductoManualidad.findByPk(id);
        if (producto) {
            await producto.update(req.body);
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarProductoManualidad = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await ProductoManualidad.findByPk(id);
        if (producto) {
            await producto.destroy();
            res.status(200).json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
