import db from '../config/db.js';

export const obtenerFavoritosPorUsuario = async (usuarioId) => {
  const sql = `
    SELECT f.id AS favoritoId, f.planeta_id AS planetaId, f.orden
      FROM favoritos f
     WHERE f.usuario_id = ?
     ORDER BY f.orden ASC
  `;
  const [rows] = await db.promise().execute(sql, [usuarioId]);
  return rows;
};

export const añadirAFavoritos = async ({ usuarioId, planetaId, orden }) => {
  const sql = 'INSERT INTO favoritos (usuario_id, planeta_id, orden) VALUES (?, ?, ?)';
  const [result] = await db.promise().execute(sql, [usuarioId, planetaId, orden]);
  return result.insertId;
};

export const existeFavorito = async (usuarioId, planetaId) => {
  const sql = 'SELECT id FROM favoritos WHERE usuario_id = ? AND planeta_id = ?';
  const [rows] = await db.promise().execute(sql, [usuarioId, planetaId]);
  return rows.length > 0 ? rows[0].id : null; 
};

export const eliminarFavorito = async (favoritoId, usuarioId) => {
  const sql = 'DELETE FROM favoritos WHERE id = ? AND usuario_id = ?';
  return db.promise().execute(sql, [favoritoId, usuarioId]);
};

export const actualizarOrdenFavorito = async (favoritoId, usuarioId, nuevoOrden) => {
  const sql = 'UPDATE favoritos SET orden = ? WHERE id = ? AND usuario_id = ?';
  return db.promise().execute(sql, [nuevoOrden, favoritoId, usuarioId]);
};
