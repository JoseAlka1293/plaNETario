import multer from 'multer';
import path from 'path';

// Configuramos dónde y con qué nombre guardamos los ficheros
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Si el campo es 'imagen_web' guardamos en uploads/images,
    // si es 'modelo_3d' en uploads/models
    const folder =
      file.fieldname === 'imagen_web'
        ? 'uploads/images'
        : 'uploads/models';
    cb(null, path.join(process.cwd(), 'public', folder));
  },
  filename: (req, file, cb) => {
    // Construimos un nombre único: campo-timestamp.ext
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  }
});

export const upload = multer({ storage });
