import { Router } from "express";
import multer from 'multer';

import { Request, Response } from '../http-client';
import FileController from '../controllers/file';
import FileToFileDto from "../converters/fileToFileDto";
import PinoAdapter from "../../infra/adapters/pino";
import { MAX_OF_FILES_PER_UPLOAD } from "../../env";
import AddFilesUseCase from "../../app/use-cases/add-files";
import FileRepository from "../../infra/repository/file";
import DeleteFilesUseCase from "../../app/use-cases/delete-files";
import authenticate from "../middlewares/auth";

interface File extends Express.Multer.File { };
type FilterFileCallback = (error: null, acceptFile: boolean) => void;
type FormatFileNameCallback = (error: Error | null, filename: string) => void;

const fileRepository = new FileRepository();
const addFilesUseCase = new AddFilesUseCase(fileRepository);
const deleteFilesUseCase = new DeleteFilesUseCase(fileRepository);
const fileToFileDto = new FileToFileDto();
const logger = new PinoAdapter();
const fileController = new FileController(addFilesUseCase, deleteFilesUseCase, fileToFileDto, logger);

const router = Router();

const ALLOWED_MIME_TYPES = [
  'text/csv',
];

const storage = multer.diskStorage({
  destination: './uploads',
  filename: formatFileName
});

function formatFileName(req: Request, file: File, callback: FormatFileNameCallback) {
  callback(null, `${Date.now()}-${file.originalname}`);
}

const upload = multer({
  storage: storage,
  limits: { fileSize: megaBytesToBytes(200) },
  fileFilter: fileFilter
});

function megaBytesToBytes(megaBytes: number) {
  return megaBytes * 1024 * 1024;
}

function fileFilter(req: Request, file: File, callback: FilterFileCallback) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

router.post(
  "/upload",
  authenticate,
  upload.array('files', MAX_OF_FILES_PER_UPLOAD),
  (req: Request, res: Response) => fileController.upload(req, res) as unknown as void,
);

router.delete(
  "/",
  authenticate,
  (req: Request, res: Response) => fileController.delete(req, res) as unknown as void,
);

export default router;
