import db from '../config/db.js';

// Listar todos los usuarios (para admin)
export const getUsuarios = async (req, res) => {
    try {
      const [rows] = await db.promise().execute(
        'SELECT id, nombre, email, rol, fecha_registro FROM usuarios'
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
  };

export const cambiarRolUsuario = (req, res) => {
  const { id } = req.params;
  const { rol } = req.body; // 'user' o 'admin'
  if (!['user','admin'].includes(rol)) {
    return res.status(400).json({ mensaje: 'Rol no válido' });
  }
  const sql = 'UPDATE usuarios SET rol = ? WHERE id = ?';
  db.promise().execute(sql, [rol, id])
    .then(() => res.json({ mensaje: 'Rol actualizado' }))
    .catch(err => res.status(500).json({ error: err.message }));
};
