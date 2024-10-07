import { Table, Column, Model, DataType, AllowNull, Unique, Index, BelongsTo, ForeignKey } from 'sequelize-typescript';

import File from '../../domain/file';
import UserModel from './user';
import User from '../../domain/user';

@Table({ modelName: 'File' })
export default class FileModel extends Model implements File {
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
  path: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => UserModel, 'userId')
  user: User;
}
