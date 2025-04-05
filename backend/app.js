import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './config/db.js';
import planetasRoutes from './routes/planetas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ejemplo de endpoint
// app.get('/api/planetas', (req, res) => {
//   res.json({ message: 'Listado de planetas' });
// });

// Endpoint para probar la conexión a la base de datos
app.get('/api/test-db', (req, res) => {
  connection.query('SELECT 1 AS result', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Usamos las rutas para la entidad planetas
app.use('/api/planetas', planetasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
