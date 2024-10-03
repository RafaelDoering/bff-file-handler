import User from "../../domain/user";
import Token from "../../app/ports/token";
import UserDto from "../dtos/user";

export default class UserToUserDto {
  constructor(private token: Token) { }

  public convert(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      token: this.token.encode({ id: user.id }),
    };
  }
}
