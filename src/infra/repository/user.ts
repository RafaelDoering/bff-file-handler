import User from "../../domain/user";
import Users from "../../domain/users";
import UserModel from "../models/user";

export default class UserRepository implements Users {
  public async create(email: string, password: string): Promise<User> {
    return UserModel.create({ email, password });
  };

  public async findByEmail(email: string): Promise<User | undefined> {
    return UserModel.findOne({ where: { email } });
  };
};
