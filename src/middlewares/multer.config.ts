import crypto from 'crypto';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { config } from '../config/environment';
import { AppError, ErrorCodes } from '../errors/app.error';
import { ErrorType } from '../types/error.types';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    cb(null, config.upload.dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    crypto.randomBytes(16, (err, raw): void => {
      if (err) {
        cb(err, file.originalname);
        return;
      }

      const timestamp = Date.now();
      const hashedFilename = raw.toString('hex');
      const extension = path.extname(file.originalname).toLowerCase();

      cb(null, `${timestamp}-${hashedFilename}${extension}`);
    });
  }
});

const MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (!MIME_TYPES.has(file.mimetype)) {
    cb(
      new AppError({
        message: 'Format de fichier non supporté. Formats acceptés : JPG, PNG, WEBP',
        statusCode: 400,
        type: ErrorType.BAD_REQUEST,
        code: ErrorCodes.BAD_REQUEST
      })
    );
    return;
  }

  const extension = path.extname(file.originalname).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(extension)) {
    cb(
      new AppError({
        message: 'Extension de fichier non supportée',
        statusCode: 400,
        type: ErrorType.BAD_REQUEST,
        code: ErrorCodes.BAD_REQUEST
      })
    );
    return;
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.maxSize,
    files: 1
  }
});

export const handleMulterError = (err: any): AppError => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return AppError.BadRequest(`Taille de fichier trop importante. Maximum: ${config.upload.maxSize / (1024 * 1024)}MB`, ErrorCodes.BAD_REQUEST);
      case 'LIMIT_FILE_COUNT':
        return AppError.BadRequest('Trop de fichiers envoyés', ErrorCodes.BAD_REQUEST);
      default:
        return AppError.BadRequest('Erreur lors du téléchargement du fichier', ErrorCodes.BAD_REQUEST);
    }
  }
  return err;
};

export default upload;
