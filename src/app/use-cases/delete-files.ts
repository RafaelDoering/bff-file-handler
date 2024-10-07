import Files from "../../domain/files";
import User from "../../domain/user";

export default class DeleteFilesUseCase {
  constructor(private fileRepository: Files) { }

  public async execute(paths: string[], user: User): Promise<void> {
    return await this.fileRepository.bulkDelete(paths, user);
  }
};
