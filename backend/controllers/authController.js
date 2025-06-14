import db from '../config/db.js'  
import { crearUsuario, buscarUsuarioPorEmail } from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// REGISTRO
export const register = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const usuarioExistente = await buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    await crearUsuario({ nombre, email, contraseña });
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
  }

  try {
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

//Perfil usuario registrado
export const perfil = async (req, res) => {
  try {
    // req.usuario.id lo inyecta verifyToken
    const userId = req.usuario.id;

    // Consulta directa usando db; solo seleccionamos lo que queremos exponer
    const [rows] = await db
      .promise()
      .execute(
        'SELECT id, nombre, email, rol FROM usuarios WHERE id = ?',
        [userId]
      );

    if (!rows.length) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Devolver sólo los datos seguros
    const { id, nombre, email, rol } = rows[0];
    return res.json({ id, nombre, email, rol });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};