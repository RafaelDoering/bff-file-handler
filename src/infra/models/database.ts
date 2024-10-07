import { Sequelize } from 'sequelize-typescript';

import User from './user';
import File from './file';
import { STORAGE_PATH } from '../../env';

export default class Database {
  database: Sequelize;

  initialize() {
    this.database = new Sequelize({
      dialect: 'sqlite',
      storage: STORAGE_PATH,
      models: [User, File],
    });
  }

  reset() {
    return this.database.sync({ force: true });
  }
};
