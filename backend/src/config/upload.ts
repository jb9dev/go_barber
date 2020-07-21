import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempDir = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsDir = path.resolve(tempDir, 'uploads');

export default {
  tempDir,
  uploadsDir,
  storage: multer.diskStorage({
    destination: tempDir,
    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString('HEX');
      const filename = `${hash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
