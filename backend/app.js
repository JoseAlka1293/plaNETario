import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './config/db.js';
import planetasRoutes from './routes/planetas.js';
import authRoutes from './routes/auth.js'; 
import usuarioRoutes from './routes/usuario.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);
// Ruta para usuariosRegistrados
app.use('/api/usuario', usuarioRoutes);
// Ruta para planetas
app.use('/api/planetas', planetasRoutes);

// Ruta de prueba de conexión a la BD
app.get('/api/test-db', (req, res) => {
  connection.query('SELECT 1 AS result', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
