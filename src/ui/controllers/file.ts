import fs from 'fs';

import type { Request, Response } from "../http-client";
import FileToFileDto from '../converters/fileToFileDto';
import FileDto from '../dtos/file';

export default class FileController {
  constructor(private fileToFileDto: FileToFileDto) { }

  public async upload(req: Request, res: Response) {
    const files = req.files;

    if (files.length <= 0) {
      return res.status(500).json();
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
