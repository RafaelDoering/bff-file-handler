import EmailAlreadyUsed from "../../domain/errors/emailAlreadyUsed";
import User from "../../domain/user";
import Users from "../../domain/users";
import CryptographyPort from "../ports/cryptography";

export default class SignupUseCase {
  constructor(private userRepository: Users, private cryptography: CryptographyPort) { }

  public async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new EmailAlreadyUsed;
    }

    const hashedPassword = await this.cryptography.hash(password);
    const createdUser = await this.userRepository.create(email, hashedPassword);

    return createdUser;
  }
};
