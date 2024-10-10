import fs from 'fs';

import { Next, StatusCode, type Request, type Response } from "../http-client";
import FileToFileDto from '../converters/fileToFileDto';
import FileDto from '../dtos/file';
import LoggerPort from '../../app/ports/logger';
import AddFileUseCase from '../../app/use-cases/add-files';
import DeleteFilesUseCase from '../../app/use-cases/delete-files';

export default class FileController {
  constructor(private addFilesUseCase: AddFileUseCase, private deleteFilesUseCase: DeleteFilesUseCase, private fileToFileDto: FileToFileDto, private logger: LoggerPort) { }

  public async upload(req: Request, res: Response, next: Next) {
    try {
      const files = req.files;

      if (files.length <= 0) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json();
        return;
      }

      const paths: string[] = [];
      for (const { path } of files) {
        this.logger.info(`File ${path} uploaded by ${req.user.email}`);
        paths.push(path);
      }

      await this.addFilesUseCase.execute(paths, req.user);

      res.status(StatusCode.OK).json(this.fileToFileDto.convertArray(files));
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: Next) {
    try {
      const files = req.body as FileDto[];

      const paths: string[] = [];
      for (const { path } of files) {
        fs.rmSync(path);
        paths.push(path);
      }

      await this.deleteFilesUseCase.execute(paths, req.user);

      res.status(StatusCode.OK).json();
    } catch (error) {
      next(error);
    }
  }
}
