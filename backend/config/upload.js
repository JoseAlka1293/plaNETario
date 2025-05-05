import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  // destination: dónde guardamos cada fichero
  destination(_req, file, cb) {
    // si el campo es 'imagen_web' → uploads/images
    // si el campo es 'modelo_3d'   → uploads/models
    const folder =
      file.fieldname === 'imagen_web'
        ? 'uploads/images'
        : 'uploads/models';

    // path.resolve(process.cwd(), 'public', folder) → ruta absoluta a backend/public/uploads/...
    cb(null, path.resolve(process.cwd(), 'public', folder));
  },

  // filename: ¡conservamos el nombre original!
  filename(_req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
