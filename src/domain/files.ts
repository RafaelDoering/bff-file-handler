import File from "./file";
import User from "./user";

export default interface Files {
  bulkCreate(paths: string[], user: User): Promise<File[]>;
  bulkDelete(paths: string[], user: User): Promise<void>;
}
