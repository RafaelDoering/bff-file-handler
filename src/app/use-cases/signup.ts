import EmailAlreadyUsed from "../../domain/errors/emailAlreadyUsed";
import User from "../../domain/user";
import Users from "../../domain/users";
import AvatarPort from "../ports/avatar";
import CryptographyPort from "../ports/cryptography";

export default class SignupUseCase {
  constructor(private userRepository: Users, private cryptography: CryptographyPort, private avatar: AvatarPort) { }

  public async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new EmailAlreadyUsed();
    }

    const hashedPassword = await this.cryptography.hash(password);

    const hashedEmail = await this.cryptography.hash(email);
    const avatar = await this.avatar.get(hashedEmail);

    const createdUser = await this.userRepository.create(email, hashedPassword, avatar);

    return createdUser;
  }
};
