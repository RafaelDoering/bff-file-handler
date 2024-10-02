import UserNotFound from "../../domain/errors/userNotFound";
import Users from "../../domain/users";

export default class LoginService {
  constructor(private userRepository: Users) { }

  public async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (
      !user ||
      !user.password ||
      user.password !== password
    ) {
      throw new UserNotFound;
    }

    return user;
  }
};
