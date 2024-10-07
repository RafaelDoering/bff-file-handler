import Files from "../../domain/files";
import File from "../../domain/file";
import User from "../../domain/user";

export default class AddFilesUseCase {
  constructor(private fileRepository: Files) { }

  public async execute(paths: string[], user: User): Promise<File[]> {
    return await this.fileRepository.bulkCreate(paths, user);
  }
};
