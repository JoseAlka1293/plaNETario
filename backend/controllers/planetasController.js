import connection from '../config/db.js';

// GET /api/planetas
export const getPlanetas = (req, res) => {
  const sql = `
    SELECT
      id,
      nombre,
      descripcion,
      orden_solar,
      imagen_web,
      modelo_3d
    FROM planetas
    ORDER BY orden_solar ASC
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al leer planetas:', err);
      return res.status(500).json({ error: err.message });
    }
    // results ya contienen las URLs completas porque en INSERT/UPDATE
    // guardamos '/uploads/...' directamente en la columna imagen_web/modelo_3d
    res.json(results);
  });
};

// GET /api/planetas/:id
export const getPlanetaById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT
      id,
      nombre,
      descripcion,
      orden_solar,
      imagen_web,
      modelo_3d
    FROM planetas
    WHERE id = ?
  `;
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(`Error al leer planeta ${id}:`, err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Planeta no encontrado' });
    }
    res.json(results[0]);
  });
};

// POST /api/planetas
export const createPlaneta = (req, res) => {
  const { nombre, descripcion, orden_solar } = req.body;

  // construimos la URL pública según multer ya haya guardado el fichero
  const imagen_web = req.files?.imagen_web?.[0]?.filename
    ? `/uploads/images/${req.files.imagen_web[0].filename}`
    : null;

  const modelo_3d = req.files?.modelo_3d?.[0]?.filename
    ? `/uploads/models/${req.files.modelo_3d[0].filename}`
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
      if (err) {
        console.error('Error al crear planeta:', err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: 'Planeta creado',
        id: result.insertId,
        nombre,
        descripcion,
        orden_solar,
        imagen_web,
        modelo_3d
      });
    }
  );
};

// PUT /api/planetas/:id
export const updatePlaneta = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, orden_solar } = req.body;

  // primero leemos las rutas actuales para conservarlas si no llega nuevo fichero
  connection.query(
    'SELECT imagen_web, modelo_3d FROM planetas WHERE id = ?',
    [id],
    (selErr, rows) => {
      if (selErr) {
        console.error(`Error al buscar planeta ${id}:`, selErr);
        return res.status(500).json({ error: selErr.message });
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Planeta no encontrado' });
      }

      const current = rows[0];
      // si se sube fichero nuevo, usamos filename, si no, mantenemos URL antigua
      const imagen_web = req.files?.imagen_web?.[0]?.filename
        ? `/uploads/images/${req.files.imagen_web[0].filename}`
        : current.imagen_web;

      const modelo_3d = req.files?.modelo_3d?.[0]?.filename
        ? `/uploads/models/${req.files.modelo_3d[0].filename}`
        : current.modelo_3d;

      const sql = `
        UPDATE planetas
        SET nombre       = ?,
            descripcion  = ?,
            orden_solar  = ?,
            imagen_web   = ?,
            modelo_3d    = ?
        WHERE id = ?
      `;
      connection.query(
        sql,
        [nombre, descripcion, orden_solar, imagen_web, modelo_3d, id],
        (updErr) => {
          if (updErr) {
            console.error(`Error al actualizar planeta ${id}:`, updErr);
            return res.status(500).json({ error: updErr.message });
          }
          res.json({
            message: 'Planeta actualizado',
            id,
            nombre,
            descripcion,
            orden_solar,
            imagen_web,
            modelo_3d
          });
        }
      );
    }
  );
};

// DELETE /api/planetas/:id
export const deletePlaneta = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM planetas WHERE id = ?',
    [id],
    (err) => {
      if (err) {
        console.error(`Error al eliminar planeta ${id}:`, err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Planeta eliminado' });
    }
  );
};
