import UserNotFound from "../../domain/errors/userNotFound";
import WrongPassword from "../../domain/errors/wrongPassword";
import Users from "../../domain/users";
import Cryptography from "../../utils/bcryptjs-cryptography";

export default class LoginService {
  constructor(private userRepository: Users, private cryptography: Cryptography) { }

  public async execute(email: string, password: string) {
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
