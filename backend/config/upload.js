import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  // destination: donde metemos cada fichero
  destination(_req, file, cb) {
    // si el campo se llama 'imagen_web' guardamos en public/uploads/images,
    // si no (modelo_3d) en public/uploads/models
    const folder =
      file.fieldname === 'imagen_web'
        ? 'uploads/images'
        : 'uploads/models';
    // path.resolve te lleva a la raiz del proyecto + public + carpeta
    cb(null, path.resolve(process.cwd(), 'public', folder));
  },
  // filename: conservamos el nombre original
  filename(_req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;

