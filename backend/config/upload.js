import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(_req, file, cb) {
    const folder =
      file.fieldname === 'imagen_web'
        ? 'uploads/images'
        : 'uploads/models';

    cb(null, path.resolve(process.cwd(), 'public', folder));
  },

  filename(_req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
