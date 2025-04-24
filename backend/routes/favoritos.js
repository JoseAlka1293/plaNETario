import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { 
    getFavoritosPorUsuario, 
    postFavorito,
    deleteFavorito,
    putFavorito
} from '../controllers/favoritosController.js';

const router = express.Router();

// Obtener favoritos del usuario logueado
router.get('/', verifyToken, getFavoritosPorUsuario);

// Añadir un planeta a favoritos
router.post('/', verifyToken, postFavorito);

// Eliminar favorito
router.delete('/:id', verifyToken, deleteFavorito);   

// Actualizar orden
router.put('/:id', verifyToken, putFavorito); 

export default router;
