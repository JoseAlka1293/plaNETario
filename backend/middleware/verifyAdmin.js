import verifyToken from './verifyToken.js';

const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'Se requiere rol admin' });
    }
    next();
  });
};

export default verifyAdmin;
