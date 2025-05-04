import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 🧠 ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fileName: string) => void;

export const uploader = (
  filePrefix: string,
  folderName = '',
  fileLimit = 1 * 1024 * 1024
) => {
  const defaultDir = path.join(__dirname, '../../public');
  const fullPath = path.join(defaultDir, folderName);

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedExt = /\.(jpg|jpeg|png)$/;
    const allowedMimes = ['image/jpeg', 'image/png'];
    const isExtMatch = allowedExt.test(file.originalname.toLowerCase());
    const isMimeMatch = allowedMimes.includes(file.mimetype);

    if (isExtMatch && isMimeMatch) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg and .png files are allowed.'));
    }
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb: DestinationCallback) => {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      cb(null, fullPath);
    },
    filename: (req, file, cb: FileNameCallback) => {
      const ext = path.extname(file.originalname);
      const fileName = `${filePrefix}${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });

  return multer({ storage, fileFilter, limits: { fileSize: fileLimit } });
};
