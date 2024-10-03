export interface UserToken {
  id: number;
}

export default interface UserTokenPort {
  encode(payload: UserToken): string;
  decode(token: string): UserToken;
}
