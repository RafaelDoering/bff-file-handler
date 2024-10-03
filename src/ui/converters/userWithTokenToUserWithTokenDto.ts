import UserWithToken from "../../domain/user-with-token";
import UserWithTokenDto from "../dtos/userWithToken";

export default class UserWithTokenToUserWithTokenDto {
  public convert(userWithToken: UserWithToken): UserWithTokenDto {
    return {
      id: userWithToken.id,
      email: userWithToken.email,
      token: userWithToken.token,
    };
  }
}
