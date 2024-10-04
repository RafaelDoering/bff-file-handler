import { Router } from "express";
import multer from 'multer';

import { Request } from '../http-client';
import FileController from '../controllers/file';
import FileToFileDto from "../converters/fileToFileDto";

const fileToFileDto = new FileToFileDto();
const fileController = new FileController(fileToFileDto);

const router = Router();

const ALLOWED_FILE_TYPES = [
  'text/csv'
]

const upload = multer({
  dest: './uploads/',
  fileFilter: function (req, file, cb) {
    ALLOWED_FILE_TYPES.includes(file.mimetype) ? cb(null, true) : cb(null, false)
  }
});

router.post(
  "/upload",
  upload.array('files', 10),
  (req, res) => fileController.upload(req as Request, res) as unknown as void,
);

router.delete(
  "/",
  (req, res) => fileController.delete(req as Request, res) as unknown as void,
);

export default router;
