import User from "../../domain/user";
import UserDto from "../dtos/user";

export default class UserToUserDto {
  public convert(user: User): UserDto {
    return {
      email: user.email,
      id: user.id,
    };
  }
}
