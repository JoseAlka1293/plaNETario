// backend/controllers/planetasController.js
import connection from '../config/db.js';
import path from 'path';

// Obtener todos los planetas (ordenados por el orden del sistema solar)
export const getPlanetas = (req, res) => {
  connection.query(
    'SELECT * FROM planetas ORDER BY orden_solar ASC',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Obtener un planeta por ID
export const getPlanetaById = (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT * FROM planetas WHERE id = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(404).json({ message: 'Planeta no encontrado' });
      }
      res.json(results[0]);
    }
  );
};

// Crear un nuevo planeta
export const createPlaneta = (req, res) => {
  const { nombre, descripcion, orden_solar } = req.body;

  // Sacamos las rutas públicas de los ficheros subidos, si existen
  const imagen_web = req.files?.imagen_web?.[0]?.originalname
    ? `/uploads/images/${req.files.imagen_web[0].originalname}`
    : null;

  const modelo_3d = req.files?.modelo_3d?.[0]?.originalname
    ? `/uploads/models/${req.files.modelo_3d[0].originalname}`
    : null;

  const sql = `
    INSERT INTO planetas
      (nombre, descripcion, orden_solar, imagen_web, modelo_3d)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [nombre, descripcion, orden_solar, imagen_web, modelo_3d],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: 'Planeta creado',
        id: result.insertId,
        imagen_web,
        modelo_3d
      });
    }
  );
};

// Actualizar un planeta existente
export const updatePlaneta = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, orden_solar } = req.body;

  // Primero leemos lo que había antes
  connection.query(
    'SELECT imagen_web, modelo_3d FROM planetas WHERE id = ?',
    [id],
    (selErr, rows) => {
      if (selErr) return res.status(500).json({ error: selErr.message });
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Planeta no encontrado' });
      }

      let current = rows[0];

      // Si llegan ficheros nuevos, los usamos; si no, mantenemos los antiguos
      const imagen_web = req.files?.imagen_web?.[0]?.originalname
        ? `/uploads/images/${req.files.imagen_web[0].originalname}`
        : current.imagen_web;

      const modelo_3d = req.files?.modelo_3d?.[0]?.originalname
        ? `/uploads/models/${req.files.modelo_3d[0].originalname}`
        : current.modelo_3d;

      const sql = `
        UPDATE planetas
        SET nombre = ?, descripcion = ?, orden_solar = ?, imagen_web = ?, modelo_3d = ?
        WHERE id = ?
      `;

      connection.query(
        sql,
        [nombre, descripcion, orden_solar, imagen_web, modelo_3d, id],
        (updErr) => {
          if (updErr) return res.status(500).json({ error: updErr.message });
          res.json({
            message: 'Planeta actualizado',
            imagen_web,
            modelo_3d
          });
        }
      );
    }
  );
};

// Eliminar un planeta
export const deletePlaneta = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM planetas WHERE id = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Planeta eliminado' });
    }
  );
};
