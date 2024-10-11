import { Sequelize } from 'sequelize-typescript';

import User from './infra/models/user';
import File from './infra/models/file';
import { STORAGE_PATH } from './env';

beforeAll(async () => {
  const database = new Sequelize({
    dialect: 'sqlite',
    storage: STORAGE_PATH,
    models: [User, File],
  });

  await database.sync({ force: true });

  await User.create({
    id: 1,
    email: 'global-test@test.com',
    password: 'test123',
    avatar: 'avatar',
  })
});