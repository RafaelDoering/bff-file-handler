import EmailAlreadyUsed from '../../domain/errors/emailAlreadyUsed';
import User from '../../domain/user';
import Users from '../../domain/users';
import AvatarPort from '../ports/avatar';
import CryptographyPort from '../ports/cryptography';
import SignupUseCase from './signup';

const users = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn()
} as jest.Mocked<Users>;

const cryptography = {
  hash: jest.fn(),
  compare: jest.fn()
} as jest.Mocked<CryptographyPort>;

const avatar = {
  get: jest.fn(),
} as jest.Mocked<AvatarPort>;

const subject = new SignupUseCase(users, cryptography, avatar);

const ID = 1;
const EMAIL = 'test-email';
const PASSWORD = 'test-password';
const HASHED_PASSWORD = 'hashed-test-password';

const user: User = {
  id: ID,
  email: EMAIL,
  password: PASSWORD,
  avatar: EMAIL,
};

beforeAll(() => {
  users.findByEmail.mockResolvedValue(undefined);
  users.create.mockResolvedValue(user);
  cryptography.hash.mockResolvedValue(HASHED_PASSWORD);
  avatar.get.mockResolvedValue(EMAIL);
})

test('return token when repository return user', async () => {
  const result = await subject.execute(EMAIL, PASSWORD);

  expect(result).toEqual(user);
});

test('throw UserNotFound when user is not found', async () => {
  users.findByEmail.mockResolvedValueOnce(user);

  await expect(subject.execute(EMAIL, PASSWORD))
    .rejects
    .toThrow(EmailAlreadyUsed);
});
