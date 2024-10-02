import User from "./user";

export default interface Users {
  create(email: string, password: string): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
