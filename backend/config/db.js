import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,            // 'localhost'
  user: process.env.DB_USER,            // Usuario de MySQL
  password: process.env.DB_PASSWORD,    // Contraseña
  database: process.env.DB_NAME,        // 'planetario_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conexion exitosa a la base de datos MySQL');
});

export default connection;
