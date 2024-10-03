import UserNotFound from "../../domain/errors/userNotFound";
import User from "../../domain/user";
import Users from "../../domain/users";
import UserTokenPort from "../ports/user-token";

export default class AuthenticateUseCase {
  constructor(private userRepository: Users, private userToken: UserTokenPort) { }

  public async execute(token: string): Promise<User> {
    const cleanToken = token.replace("Bearer ", "");
    const decoded = this.userToken.decode(cleanToken);

    const user = await this.userRepository.findById(decoded.id);
    if (!user) {
      throw new UserNotFound;
    }

    return user;
  }
};
