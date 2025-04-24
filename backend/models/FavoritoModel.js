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

// Comprobar si ya existe el planeta en favoritos
export const existeFavorito = async (usuarioId, planetaId) => {
  const sql = 'SELECT * FROM favoritos WHERE usuario_id = ? AND planeta_id = ?';
  const [rows] = await db.promise().execute(sql, [usuarioId, planetaId]);
  return rows.length > 0;
};

// Eliminar favorito por ID
export const eliminarFavorito = async (favoritoId, usuarioId) => {
  const sql = 'DELETE FROM favoritos WHERE id = ? AND usuario_id = ?';
  return db.promise().execute(sql, [favoritoId, usuarioId]);
};

// Actualizar orden de un favorito
export const actualizarOrdenFavorito = async (favoritoId, usuarioId, nuevoOrden) => {
  const sql = 'UPDATE favoritos SET orden = ? WHERE id = ? AND usuario_id = ?';
  return db.promise().execute(sql, [nuevoOrden, favoritoId, usuarioId]);
};
