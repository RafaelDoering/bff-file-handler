import UserNotFound from "../../domain/errors/userNotFound";
import WrongPassword from "../../domain/errors/wrongPassword";
import User from "../../domain/user";
import Users from "../../domain/users";
import CryptographyPort from "../ports/cryptography";

export default class LoginUseCase {
  constructor(private userRepository: Users, private cryptography: CryptographyPort) { }

  public async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound;
    }

    if (!(await this.cryptography.compare(password, user.password))) {
      throw new WrongPassword;
    }

    return user;
  }
};
