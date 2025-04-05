import express from 'express';
import {
  getPlanetas,
  getPlanetaById,
  createPlaneta,
  updatePlaneta,
  deletePlaneta,
} from '../controllers/planetasController.js';

const router = express.Router();

// GET: Obtener todos los planetas
router.get('/', getPlanetas);

// GET: Obtener un planeta por su ID
router.get('/:id', getPlanetaById);

// POST: Crear un nuevo planeta
router.post('/', createPlaneta);

// PUT: Actualizar un planeta existente
router.put('/:id', updatePlaneta);

// DELETE: Eliminar un planeta
router.delete('/:id', deletePlaneta);

export default router;
