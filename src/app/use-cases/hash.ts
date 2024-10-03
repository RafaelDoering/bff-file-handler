import Cryptography from "../ports/cryptography";

export default class HashUseCase {
  constructor(private cryptography: Cryptography) { }

  public async execute(str: string): Promise<string> {
    return this.cryptography.hash(str);
  }
};
