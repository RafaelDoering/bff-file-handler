import User from "./user";

export default interface File {
  id: number;
  path: string;
  user: User;
}
