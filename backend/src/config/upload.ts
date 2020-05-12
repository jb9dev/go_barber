import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const destinationPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: destinationPath,
  storage: multer.diskStorage({
    destination: destinationPath,
    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString('HEX');
      const filename = `${hash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
