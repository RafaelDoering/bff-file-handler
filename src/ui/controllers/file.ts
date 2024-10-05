import fs from 'fs';

import type { Request, Response } from "../http-client";
import FileToFileDto from '../converters/fileToFileDto';
import FileDto from '../dtos/file';
import LoggerPort from '../../app/ports/logger';

export default class FileController {
  constructor(private fileToFileDto: FileToFileDto, private logger: LoggerPort) { }

  public async upload(req: Request, res: Response) {
    const files = req.files;

    if (files.length <= 0) {
      return res.status(500).json();
    }

    for (const file of files) {
      this.logger.info(file.path);
    }

    return res.status(200).json(this.fileToFileDto.convertArray(files));
  }

  public async delete(req: Request, res: Response) {
    const files = req.body as FileDto[];

    for (const file of files) {
      fs.rmSync(file.path);
    }

    return res.status(200).json();
  }
}
