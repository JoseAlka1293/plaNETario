import express from 'express';
import {
  getPlanetas,
  getPlanetaById,
  createPlaneta,
  updatePlaneta,
  deletePlaneta,
} from '../controllers/planetasController.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import { upload } from '../config/upload.js';

const router = express.Router();

// GET: Obtener todos los planetas (público)
router.get('/', getPlanetas);

// GET: Obtener un planeta por su ID (público)
router.get('/:id', getPlanetaById);

// POST: Crear un nuevo planeta (solo ADMIN)
// └─ Aquí procesamos dos campos de archivo: imagen_web y modelo_3d
router.post(
  '/',
  verifyAdmin,
  upload.fields([
    { name: 'imagen_web', maxCount: 1 },
    { name: 'modelo_3d',   maxCount: 1 }
  ]),
  createPlaneta
);

// PUT: Actualizar un planeta existente (solo ADMIN)
// └─ También permitimos reemplazar los archivos
router.put(
  '/:id',
  verifyAdmin,
  upload.fields([
    { name: 'imagen_web', maxCount: 1 },
    { name: 'modelo_3d',   maxCount: 1 }
  ]),
  updatePlaneta
);

// DELETE: Eliminar un planeta (solo ADMIN)
router.delete('/:id', verifyAdmin, deletePlaneta);

export default router;
