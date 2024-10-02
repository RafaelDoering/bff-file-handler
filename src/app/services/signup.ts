import EmailAlreadyUsed from "../../domain/errors/emailAlreadyUsed";
import Users from "../../domain/users";

export default class SignupService {
  constructor(private userRepository: Users) { }

  public async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new EmailAlreadyUsed;
    }

    const createdUser = await this.userRepository.create(email, password);

    return createdUser;
  }
};
