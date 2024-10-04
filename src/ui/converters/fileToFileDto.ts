import { File } from "../http-client";
import FileDto from "../dtos/file";

export default class FileToFileDto {
  public convert(file: File): FileDto {
    return {
      path: file.path,
    };
  }

  public convertArray(files: File[]): FileDto[] {
    return files.map((file) => this.convert(file));
  }
}
