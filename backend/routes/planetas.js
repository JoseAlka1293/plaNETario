import express from 'express';
import {
  getPlanetas,
  getPlanetaById,
  createPlaneta,
  updatePlaneta,
  deletePlaneta,
} from '../controllers/planetasController.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import upload from '../config/upload.js';

const router = express.Router();

// GET: obtener todos los planetas (público)
router.get('/', getPlanetas);

// GET: obtener un planeta por su ID (público)
router.get('/:id', getPlanetaById);

// POST: crear un nuevo planeta (solo ADMIN)
// — además de los campos de texto, procesamos dos ficheros:
//    • imagen_web  (max 1 imagen)
//    • modelo_3d    (max 1 modelo)
router.post(
  '/',
  verifyAdmin,
  upload.fields([
    { name: 'imagen_web', maxCount: 1 },
    { name: 'modelo_3d',   maxCount: 1 }
  ]),
  createPlaneta
);

// PUT: actualizar un planeta existente (solo ADMIN)
// — también admitimos reemplazar los ficheros subidos
router.put(
  '/:id',
  verifyAdmin,
  upload.fields([
    { name: 'imagen_web', maxCount: 1 },
    { name: 'modelo_3d',   maxCount: 1 }
  ]),
  updatePlaneta
);

// DELETE: eliminar un planeta (solo ADMIN)
router.delete('/:id', verifyAdmin, deletePlaneta);

export default router;

