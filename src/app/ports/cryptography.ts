export default interface CryptographyPort {
  hash(str: string): Promise<string>;
  compare(str: string, hash: string): Promise<boolean>;
}
