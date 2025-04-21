import express from 'express';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/perfil', verifyToken, (req, res) => {
  res.status(200).json({
    mensaje: 'Ruta protegida accedida correctamente',
    usuario: req.usuario  // datos del token JWT
  });
});

export default router;
