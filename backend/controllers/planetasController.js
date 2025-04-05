import connection from '../config/db.js';

// Obtener todos los planetas
export const getPlanetas = (req, res) => {
  connection.query('SELECT * FROM planetas', (err, results) => {
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
  const { nombre, descripcion, imagen_url, posicion_x, posicion_y, posicion_z } = req.body;
  const sql = 'INSERT INTO planetas (nombre, descripcion, imagen_url, posicion_x, posicion_y, posicion_z) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nombre, descripcion, imagen_url, posicion_x, posicion_y, posicion_z], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Planeta creado', id: result.insertId });
  });
};

// Actualizar un planeta existente
export const updatePlaneta = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen_url, posicion_x, posicion_y, posicion_z } = req.body;
  const sql = 'UPDATE planetas SET nombre = ?, descripcion = ?, imagen_url = ?, posicion_x = ?, posicion_y = ?, posicion_z = ? WHERE id = ?';
  connection.query(sql, [nombre, descripcion, imagen_url, posicion_x, posicion_y, posicion_z, id], (err, result) => {
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