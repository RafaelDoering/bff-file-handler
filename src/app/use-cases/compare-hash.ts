import CryptographyPort from "../ports/cryptography";

export default class CompareHashUseCase {
  constructor(private cryptography: CryptographyPort) { }

  public async execute(str: string, hash: string): Promise<boolean> {
    return this.cryptography.compare(str, hash);
  }
};
