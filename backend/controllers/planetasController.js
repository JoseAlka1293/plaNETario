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

  // Multer nos deja los ficheros en req.files
  let imagen_web = null;
  let modelo_3d   = null;

  if (req.files?.imagen_web?.[0]) {
    // ruta pública: /uploads/images/<filename>
    imagen_web = path.join(
      'uploads',
      'images',
      req.files.imagen_web[0].filename
    );
  }

  if (req.files?.modelo_3d?.[0]) {
    // ruta pública: /uploads/models/<filename>
    modelo_3d = path.join(
      'uploads',
      'models',
      req.files.modelo_3d[0].filename
    );
  }

  const sql =
    'INSERT INTO planetas (nombre, descripcion, orden_solar, imagen_web, modelo_3d) VALUES (?, ?, ?, ?, ?)';
  connection.query(
    sql,
    [nombre, descripcion, orden_solar, imagen_web, modelo_3d],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Planeta creado', id: result.insertId });
    }
  );
};

// Actualizar un planeta existente
export const updatePlaneta = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, orden_solar } = req.body;

  // Primero obtenemos el registro actual (en caso de no subir nuevo archivo)
  connection.query(
    'SELECT imagen_web, modelo_3d FROM planetas WHERE id = ?',
    [id],
    (selErr, rows) => {
      if (selErr) return res.status(500).json({ error: selErr.message });
      if (rows.length === 0)
        return res.status(404).json({ message: 'Planeta no encontrado' });

      let current = rows[0];

      // Si vienen nuevos ficheros, reemplazamos. Si no, mantenemos la ruta actual.
      let imagen_web = current.imagen_web;
      let modelo_3d  = current.modelo_3d;

      if (req.files?.imagen_web?.[0]) {
        imagen_web = path.join(
          'uploads',
          'images',
          req.files.imagen_web[0].filename
        );
      }

      if (req.files?.modelo_3d?.[0]) {
        modelo_3d = path.join(
          'uploads',
          'models',
          req.files.modelo_3d[0].filename
        );
      }

      const sql =
        'UPDATE planetas SET nombre = ?, descripcion = ?, orden_solar = ?, imagen_web = ?, modelo_3d = ? WHERE id = ?';
      connection.query(
        sql,
        [nombre, descripcion, orden_solar, imagen_web, modelo_3d, id],
        (updErr) => {
          if (updErr) return res.status(500).json({ error: updErr.message });
          res.json({ message: 'Planeta actualizado' });
        }
      );
    }
  );
};

// Eliminar un planeta
export const deletePlaneta = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM planetas WHERE id = ?';
  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Planeta eliminado' });
  });
};
