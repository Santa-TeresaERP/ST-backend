import bcrypt from 'bcryptjs';
import {Op } from 'sequelize';
import User from '../models/user_model.js';

export const createUser = async (req, res) => {
  const { name, phonenumber, dni, email, password, modules, isadmin } = req.body;
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { dni }],
      },
    });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      name,
      phonenumber,
      dni,
      email,
      password: hashedPassword,
      modules: modules || {
        administrativo: { access: false },
        ventas: { access: false, reposteria: false, manualidades: false, misa: false },
        alquileres: { access: false, santaCatalina: false, goyoneche: false, santaMarta: false }
      },
      isadmin: isadmin || false,
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Server error');
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.update(updatedData);
    res.json({ message: 'Permisos actualizados', user });
  } catch (error) {
    console.error('Error al actualizar permisos de usuario:', error);
    res.status(500).json({ message: 'Error al actualizar permisos de usuario' });
  }
};

