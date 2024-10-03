export default interface Cryptography {
  hash(str: string): Promise<string>;
  compare(str: string, hash: string): Promise<boolean>;
}
