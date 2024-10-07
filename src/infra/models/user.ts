import { Table, Column, Model, DataType, AllowNull, Unique, Index } from 'sequelize-typescript';

import User from '../../domain/user';

@Table({ modelName: 'User' })
export default class UserModel extends Model implements User {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Index
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;
}
