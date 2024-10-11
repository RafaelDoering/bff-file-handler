import User from "./user";

export default interface Users {
  create(email: string, password: string, avatar: string): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
}
