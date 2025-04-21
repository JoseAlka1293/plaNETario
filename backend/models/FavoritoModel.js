import db from '../config/db.js';

// Obtener planetas favoritos de un usuario
export const obtenerFavoritosPorUsuario = async (usuarioId) => {
  const sql = `
    SELECT p.* FROM favoritos f
    JOIN planetas p ON p.id = f.planeta_id
    WHERE f.usuario_id = ?
    ORDER BY f.orden ASC
  `;
  const [rows] = await db.promise().execute(sql, [usuarioId]);
  return rows;
};

// Añadir planeta a favoritos
export const añadirAFavoritos = async ({ usuarioId, planetaId, orden }) => {
  const sql = 'INSERT INTO favoritos (usuario_id, planeta_id, orden) VALUES (?, ?, ?)';
  return db.promise().execute(sql, [usuarioId, planetaId, orden]);
};
