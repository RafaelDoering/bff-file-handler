import UserNotFound from '../../domain/errors/userNotFound';
import WrongPassword from '../../domain/errors/wrongPassword';
import User from '../../domain/user';
import Users from '../../domain/users';
import CryptographyPort from '../ports/cryptography';
import LoginUseCase from './login';

const usersMock = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn()
} as jest.Mocked<Users>;

const cryptographyMock = {
  hash: jest.fn(),
  compare: jest.fn()
} as jest.Mocked<CryptographyPort>;

const subject = new LoginUseCase(usersMock, cryptographyMock);

const ID = 1;
const EMAIL = 'test-email';
const PASSWORD = 'test-password';

const user: User = {
  id: ID,
  email: EMAIL,
  password: PASSWORD,
  avatar: EMAIL
};

beforeEach(() => {
  usersMock.findByEmail.mockResolvedValue(user);
  cryptographyMock.compare.mockResolvedValue(true);
})

test('return token when repository return user and cryptography return true', async () => {
  const result = await subject.execute(EMAIL, PASSWORD);

  expect(result).toEqual(user);
});

test('throw UserNotFound when user is not found', async () => {
  usersMock.findByEmail.mockResolvedValueOnce(undefined);

  await expect(subject.execute(EMAIL, PASSWORD))
    .rejects
    .toThrow(UserNotFound);
});

test('throw WrongPassword when compare return false', async () => {
  cryptographyMock.compare.mockResolvedValueOnce(false);

  await expect(subject.execute(EMAIL, PASSWORD))
    .rejects
    .toThrow(WrongPassword);
});
