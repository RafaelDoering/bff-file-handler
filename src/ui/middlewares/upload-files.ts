import multer from "multer";

import { Request, File } from '../http-client';
import megabytesToBytes from "../../util/megabytes-to-bytes";

type FilterFileCallback = (error: null, acceptFile: boolean) => void;
type FormatFileNameCallback = (error: Error | null, filename: string) => void;

function formatFileName(file: File) {
  return `${Date.now()}-${file.originalname}`;
}

export default (allowedMimeTypes: string[], maxOfFilesPerUpload: number, maxMegabytesPerFile: number) => {
  const storage = multer.diskStorage({
    destination: './uploads',
    filename: filename,
  });

  function filename(req: Request, file: File, callback: FormatFileNameCallback) {
    callback(null, formatFileName(file));
  }

  function fileFilter(req: Request, file: File, callback: FilterFileCallback) {
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: { fileSize: megabytesToBytes(maxMegabytesPerFile) },
    fileFilter: fileFilter
  });

  return upload.array('files', maxOfFilesPerUpload);
}
