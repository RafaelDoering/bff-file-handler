import { Router } from "express";

import { Request, Response } from '../http-client';
import FileController from '../controllers/file';
import FileToFileDto from "../converters/fileToFileDto";
import PinoAdapter from "../../infra/adapters/pino";
import { MAX_OF_FILES_PER_UPLOAD } from "../../env";
import AddFilesUseCase from "../../app/use-cases/add-files";
import FileRepository from "../../infra/repository/file";
import DeleteFilesUseCase from "../../app/use-cases/delete-files";
import authenticate from "../middlewares/auth";
import uploadFiles from "../middlewares/upload-files";
import validate from "../middlewares/validation";
import StringValidator from "../../util/validators/string-validator";
import ArrayValidator from "../../util/validators/array-validator";
import limitConcurrentRequests from "../middlewares/limit-concurrent-requets";

const ALLOWED_MIME_TYPES = ['text/csv'];
const MAX_MEGABYTES_PER_FILE = 300;

const fileRepository = new FileRepository();
const addFilesUseCase = new AddFilesUseCase(fileRepository);
const deleteFilesUseCase = new DeleteFilesUseCase(fileRepository);
const fileToFileDto = new FileToFileDto();
const logger = new PinoAdapter();
const fileController = new FileController(addFilesUseCase, deleteFilesUseCase, fileToFileDto, logger);

const router = Router();

router.post(
  "/upload",
  [
    limitConcurrentRequests,
    authenticate,
    uploadFiles(ALLOWED_MIME_TYPES, MAX_OF_FILES_PER_UPLOAD, MAX_MEGABYTES_PER_FILE),
  ],
  (req: Request, res: Response) => fileController.upload(req, res),
);

const DELETE_FILES_SCHEMA = [
  ...new ArrayValidator().body('files', { min: 1 }),
  ...new StringValidator().body('files.*.path'),
];
router.delete(
  "/",
  [
    authenticate,
    validate(DELETE_FILES_SCHEMA)
  ],
  (req: Request, res: Response) => fileController.delete(req, res),
);

export default router;
