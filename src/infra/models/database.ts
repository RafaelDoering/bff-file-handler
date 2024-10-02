import { Sequelize } from 'sequelize-typescript';

import User from './user';

export default class Database {
  database: Sequelize;

  initialize() {
    this.database = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite3',
      models: [User],
    });
  }

  reset() {
    return this.database.sync({ force: true });
  }
};
