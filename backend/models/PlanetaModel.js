import db from '../config/db.js';

export const obtenerPlanetas = async () => {
  const sql = 'SELECT * FROM planetas ORDER BY orden_solar ASC';
  const [rows] = await db.promise().execute(sql);
  return rows;
};

export const obtenerSeccionesDePlaneta = async (planetaId) => {
  const sql = 'SELECT * FROM secciones_planeta WHERE planeta_id = ?';
  const [rows] = await db.promise().execute(sql, [planetaId]);
  return rows;
};
