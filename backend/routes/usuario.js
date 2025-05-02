import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import {
getUsuarios,
cambiarRolUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();

// GET perfil del usuario autenticado
router.get('/perfil', verifyToken, (req, res) => {
res.status(200).json({
mensaje: 'Ruta protegida accedida correctamente',
usuario: req.usuario,
});
});

// GET lista de usuarios (solo ADMIN)
router.get('/', verifyAdmin, getUsuarios);

// PATCH cambiar rol de un usuario (solo ADMIN)
router.patch('/\:id/rol', verifyAdmin, cambiarRolUsuario);

export default router;
