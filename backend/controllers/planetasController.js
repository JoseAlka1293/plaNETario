import connection from '../config/db.js';

// Obtener todos los planetas (ordenados por el orden del sistema solar)
export const getPlanetas = (req, res) => {
  connection.query('SELECT * FROM planetas ORDER BY orden_solar ASC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Obtener un planeta por ID
export const getPlanetaById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM planetas WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Planeta no encontrado' });
    }
    res.json(results[0]);
  });
};

// Crear un nuevo planeta
export const createPlaneta = (req, res) => {
  const { nombre, descripcion, orden_solar, imagen_web, modelo_3d } = req.body;
  const sql = 'INSERT INTO planetas (nombre, descripcion, orden_solar, imagen_web, modelo_3d) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [nombre, descripcion, orden_solar, imagen_web, modelo_3d], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Planeta creado', id: result.insertId });
  });
};

// Actualizar un planeta existente
export const updatePlaneta = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, orden_solar, imagen_web, modelo_3d } = req.body;
  const sql = 'UPDATE planetas SET nombre = ?, descripcion = ?, orden_solar = ?, imagen_web = ?, modelo_3d = ? WHERE id = ?';
  connection.query(sql, [nombre, descripcion, orden_solar, imagen_web, modelo_3d, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Planeta actualizado' });
  });
};

// Eliminar un planeta
export const deletePlaneta = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM planetas WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Planeta eliminado' });
  });
};
