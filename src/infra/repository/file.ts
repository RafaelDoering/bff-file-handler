import File from "../../domain/file";
import Files from "../../domain/files";
import User from "../../domain/user";
import FileModel from "../models/file";

export default class FileRepository implements Files {
  public async bulkCreate(paths: string[], user: User): Promise<File[]> {
    return (await FileModel.bulkCreate(
      paths.map((path) => ({ path, userId: user.id }))
    )).map((file) => file.dataValues);
  };

  public async bulkDelete(paths: string[], user: User): Promise<void> {
    (await FileModel.destroy({ where: { path: paths, userId: user.id } }));
  };
};
