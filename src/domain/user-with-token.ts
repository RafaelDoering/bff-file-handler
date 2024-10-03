import User from './user';

export default interface UserWithToken extends User {
  token: string;
};
