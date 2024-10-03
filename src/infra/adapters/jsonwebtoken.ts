import jwt from 'jsonwebtoken';

import UserTokenPort, { UserToken } from '../../app/ports/user-token';

export default class JsonWebTokenAdapter implements UserTokenPort {
  private key: string;
  private expiresIn: string;

  constructor(key: string, expiresIn: string) {
    this.key = key;
    this.expiresIn = expiresIn;
  }

  public encode(payload: UserToken): string {
    return jwt.sign(payload, this.key, {
      expiresIn: this.expiresIn,
    });
  }

  public decode(token: string): UserToken {
    return jwt.verify(token, this.key) as UserToken;
  }
}
