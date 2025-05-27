import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {
  getFavoritosPorUsuario,
  postFavorito,
  deleteFavorito,
  putFavorito
} from '../controllers/favoritosController.js';

const router = express.Router();

router.get('/', verifyToken, getFavoritosPorUsuario);
router.post('/', verifyToken, postFavorito);
router.delete('/:id', verifyToken, deleteFavorito);
router.put('/:id', verifyToken, putFavorito);

export default router;
