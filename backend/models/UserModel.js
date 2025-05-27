import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const crearUsuario = async ({ nombre, email, contraseña, rol = 'user' }) => {
  const hash = await bcrypt.hash(contraseña, 10);
  const sql = `
    INSERT INTO usuarios 
      (nombre, email, contraseña, rol) 
    VALUES (?, ?, ?, ?)
  `;
  return db.promise().execute(sql, [nombre, email, hash, rol]);
};

export const buscarUsuarioPorEmail = async (email) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  const [rows] = await db.promise().execute(sql, [email]);
  return rows[0];
};
