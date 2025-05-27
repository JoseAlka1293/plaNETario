import connection from "../config/db.js";

// GET /api/planetas
export const getPlanetas = (req, res) => {
  const sql = `
    SELECT id, nombre, descripcion, orden_solar, imagen_web, modelo_3d
      FROM planetas
     ORDER BY orden_solar ASC
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al leer planetas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// GET /api/planetas/:id
export const getPlanetaById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT id, nombre, descripcion, orden_solar, imagen_web, modelo_3d
      FROM planetas
     WHERE id = ?
  `;
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(`Error al leer planeta ${id}:`, err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Planeta no encontrado" });
    }
    res.json(results[0]);
  });
};

// POST /api/planetas
export const createPlaneta = async (req, res) => {
  const conn = connection.promise();
  const { nombre, descripcion } = req.body;
  const nuevoOrden = parseInt(req.body.orden_solar, 10);
  const filename3d = req.files?.modelo_3d?.[0]?.filename;

  try {
    await conn.beginTransaction();

    if (filename3d) {
      const [[{ cnt }]] = await conn.query(
        `SELECT COUNT(*) AS cnt
           FROM planetas
          WHERE LOWER(SUBSTRING_INDEX(modelo_3d,'/',-1)) = LOWER(?)`,
        [filename3d]
      );
      if (cnt > 0) {
        await conn.rollback();
        return res
          .status(400)
          .json({ error: "Ya existe un modelo 3D con ese nombre" });
      }
    }

    await conn.query(
      `UPDATE planetas
          SET orden_solar = orden_solar + 1
        WHERE orden_solar >= ?`,
      [nuevoOrden]
    );

    const imagen_web = req.files?.imagen_web?.[0]?.filename
      ? `/uploads/images/${req.files.imagen_web[0].filename}`
      : null;
    const modelo_3d = filename3d ? `/uploads/models/${filename3d}` : null;

    const [result] = await conn.query(
      `INSERT INTO planetas
         (nombre, descripcion, imagen_web, modelo_3d, orden_solar)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, descripcion, imagen_web, modelo_3d, nuevoOrden]
    );

    await conn.commit();
    return res.status(201).json({
      message: "Planeta creado",
      id: result.insertId,
      nombre,
      descripcion,
      orden_solar: nuevoOrden,
      ...(imagen_web && { imagen_web }),
      ...(modelo_3d && { modelo_3d }),
    });
  } catch (err) {
    await conn.rollback();
    console.error("Error en createPlaneta:", err);
    return res.status(500).json({ error: err.message });
  }
};

// PUT /api/planetas/:id
export const updatePlaneta = async (req, res) => {
  const conn = connection.promise();
  const id = parseInt(req.params.id, 10);
  const { nombre, descripcion } = req.body;
  const nuevoOrden = parseInt(req.body.orden_solar, 10);
  const file3d = req.files?.modelo_3d?.[0]?.filename;

  try {
    await conn.beginTransaction();

    if (file3d) {
      const [[{ count }]] = await conn.query(
        `SELECT COUNT(*) AS count
           FROM planetas
          WHERE LOWER(SUBSTRING_INDEX(modelo_3d,'/',-1)) = LOWER(?)
            AND id <> ?`,
        [file3d, id]
      );
      if (count > 0) {
        await conn.rollback();
        return res
          .status(400)
          .json({ error: "Ya existe un modelo 3D con ese nombre" });
      }
    }

    const [[row]] = await conn.query(
      `SELECT orden_solar AS oldOrden
         FROM planetas
        WHERE id = ?`,
      [id]
    );
    if (!row) {
      await conn.rollback();
      return res.status(404).json({ error: "Planeta no encontrado" });
    }

    const oldOrden = row.oldOrden;

    if (nuevoOrden > oldOrden) {
      await conn.query(
        `UPDATE planetas
            SET orden_solar = orden_solar - 1
          WHERE orden_solar > ? AND orden_solar <= ?`,
        [oldOrden, nuevoOrden]
      );
    } else if (nuevoOrden < oldOrden) {
      await conn.query(
        `UPDATE planetas
            SET orden_solar = orden_solar + 1
          WHERE orden_solar >= ? AND orden_solar < ?`,
        [nuevoOrden, oldOrden]
      );
    }

    const imagen_web = req.files?.imagen_web?.[0]?.filename
      ? `/uploads/images/${req.files.imagen_web[0].filename}`
      : null;
    const modelo_3d = file3d ? `/uploads/models/${file3d}` : null;

    const fields = [
      "nombre = ?",
      "descripcion = ?",
      "orden_solar = ?",
      imagen_web ? "imagen_web = ?" : null,
      modelo_3d ? "modelo_3d = ?" : null,
    ].filter(Boolean);

    const params = [nombre, descripcion, nuevoOrden];
    if (imagen_web) params.push(imagen_web);
    if (modelo_3d) params.push(modelo_3d);
    params.push(id);

    await conn.query(
      `UPDATE planetas
          SET ${fields.join(", ")}
        WHERE id = ?`,
      params
    );

    await conn.commit();
    return res.json({
      message: "Planeta actualizado",
      id,
      nombre,
      descripcion,
      orden_solar: nuevoOrden,
      ...(imagen_web && { imagen_web }),
      ...(modelo_3d && { modelo_3d }),
    });
  } catch (err) {
    await conn.rollback();
    console.error("Error en updatePlaneta:", err);
    return res.status(500).json({ error: err.message });
  }
};

// DELETE /api/planetas/:id
export const deletePlaneta = (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM planetas WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(`Error al eliminar planeta ${id}:`, err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Planeta eliminado" });
  });
};
