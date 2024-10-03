export default interface Token {
  encode(payload: object): string;
  decode(token: string): object;
}
