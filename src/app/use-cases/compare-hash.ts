import Cryptography from "../ports/cryptography";

export default class CompareHashUseCase {
  constructor(private cryptography: Cryptography) { }

  public async execute(str: string, hash: string): Promise<boolean> {
    return this.cryptography.compare(str, hash);
  }
};
