import { createWriteStream, existsSync } from "fs";
import { rm } from "fs/promises";
import { Readable } from "stream";
import { finished } from 'stream/promises';

import AvatarPort from '../../app/ports/avatar';

const SIZE = 200;
const AVATARS_FOLDER = './public/avatars';

export default class GravatarAdapter implements AvatarPort {
  constructor() { }

  public async get(hash: string): Promise<string> {
    const url = `https://www.gravatar.com/avatar/${hash}?s=${SIZE}&d=identicon`;
    const fileName = `${hash}.png`;
    const destination = `${AVATARS_FOLDER}/${fileName}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error();
    }

    let writer = createWriteStream(destination);

    if (existsSync(destination)) {
      await rm(destination);
    }
    await finished(Readable.fromWeb(resp.body).pipe(writer));

    return destination;
  }
}
