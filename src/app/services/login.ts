import UserNotFound from "../../domain/errors/userNotFound";
import WrongPassword from "../../domain/errors/wrongPassword";
import UserWithToken from "../../domain/user-with-token";
import Users from "../../domain/users";
import Cryptography from "../../utils/cryptography/bcryptjs-cryptography";
import Token from "../../utils/token/token";

export default class LoginService {
  constructor(private userRepository: Users, private cryptography: Cryptography, private token: Token) { }

  public async execute(email: string, password: string): Promise<UserWithToken> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound;
    }

    if (!(await this.cryptography.compare(password, user.password))) {
      throw new WrongPassword;
    }

    return {
      ...user,
      token: this.token.encode({ id: user.id })
    };
  }
};
