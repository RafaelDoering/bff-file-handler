import User from "../../domain/user";
import UserTokenPort from "../../app/ports/user-token";
import UserDto from "../dtos/user";

export default class UserToUserDto {
  constructor(private userToken: UserTokenPort) { }

  public convert(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      token: this.userToken.encode({ id: user.id }),
      avatar: user.avatar,
    };
  }
}
