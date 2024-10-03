import jwt from 'jsonwebtoken';

import Token from '../../app/ports/token';

export default class JsonWebTokenAdapter implements Token {
  private key: string;
  private expiresIn: string;

  constructor(key: string, expiresIn: string) {
    this.key = key;
    this.expiresIn = expiresIn;
  }

  public encode(payload: object): string {
    return jwt.sign(payload, this.key, {
      expiresIn: this.expiresIn,
    });
  }

  public decode(token: string): object {
    return jwt.verify(token, this.key) as object;
  }
}
