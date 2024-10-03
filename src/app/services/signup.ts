import EmailAlreadyUsed from "../../domain/errors/emailAlreadyUsed";
import UserWithToken from "../../domain/user-with-token";
import Users from "../../domain/users";
import Cryptography from "../../utils/cryptography/bcryptjs-cryptography";
import Token from "../../utils/token/token";

export default class SignupService {
  constructor(private userRepository: Users, private cryptography: Cryptography, private token: Token) { }

  public async execute(email: string, password: string): Promise<UserWithToken> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new EmailAlreadyUsed;
    }

    const hashedPassword = await this.cryptography.hash(password);
    const createdUser = await this.userRepository.create(email, hashedPassword);

    console.log({
      ...createdUser,
      token: this.token.encode({ id: createdUser.id })
    })
    return {
      ...createdUser,
      token: this.token.encode({ id: createdUser.id })
    };
  }
};
