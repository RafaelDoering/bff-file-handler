import EmailAlreadyUsed from "../../domain/errors/emailAlreadyUsed";
import Users from "../../domain/users";
import Cryptography from "../../utils/bcryptjs-cryptography";

export default class SignupService {
  constructor(private userRepository: Users, private cryptography: Cryptography) { }

  public async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new EmailAlreadyUsed;
    }

    const hashedPassword = await this.cryptography.hash(password);
    const createdUser = await this.userRepository.create(email, hashedPassword);

    return createdUser;
  }
};
