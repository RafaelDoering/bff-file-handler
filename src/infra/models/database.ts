import { Sequelize } from 'sequelize-typescript';

import User from './user';
import { STORAGE_PATH } from '../../env';

export default class Database {
  database: Sequelize;

  initialize() {
    this.database = new Sequelize({
      dialect: 'sqlite',
      storage: STORAGE_PATH,
      models: [User],
    });
  }

  reset() {
    return this.database.sync({ force: true });
  }
};
