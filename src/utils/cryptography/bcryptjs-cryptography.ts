import bcrypt from 'bcryptjs';

import Cryptography from './cryptography';

export default class BcryptjsCryptography implements Cryptography {
  async hash(str: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(str, salt);
  }

  async compare(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }
}
