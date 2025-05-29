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
  const { rol } = req.body; 
  if (!['user','admin'].includes(rol)) {
    return res.status(400).json({ mensaje: 'Rol no válido' });
  }
  const sql = 'UPDATE usuarios SET rol = ? WHERE id = ?';
  db.promise().execute(sql, [rol, id])
    .then(() => res.json({ mensaje: 'Rol actualizado' }))
    .catch(err => res.status(500).json({ error: err.message }));
};

export const deleteUsuario = (req, res) => {
  const { id } = req.params
  db.query(
    'DELETE FROM usuarios WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }
      res.json({ message: 'Usuario eliminado' })
    }
  )
}