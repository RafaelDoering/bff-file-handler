import CryptographyPort from "../ports/cryptography";

export default class HashUseCase {
  constructor(private cryptography: CryptographyPort) { }

  public async execute(str: string): Promise<string> {
    return this.cryptography.hash(str);
  }
};
