import UserNotFound from '../../domain/errors/userNotFound';
import WrongPassword from '../../domain/errors/wrongPassword';
import User from '../../domain/user';
import Users from '../../domain/users';
import Cryptography from '../../utils/cryptography';
import LoginService from './login';

const usersMock = {
  findByEmail: jest.fn(),
  create: jest.fn()
} as jest.Mocked<Users>;

const cryptographyMock = {
  hash: jest.fn(),
  compare: jest.fn()
} as jest.Mocked<Cryptography>;

const subject = new LoginService(usersMock, cryptographyMock);

const ID = 1;
const EMAIL = 'test-email';
const PASSWORD = 'test-password';

const user: User = {
  id: ID,
  email: EMAIL,
  password: PASSWORD
};

beforeEach(() => {
  usersMock.findByEmail.mockResolvedValue(user);
  cryptographyMock.compare.mockResolvedValue(true);
})

test('return user when repository return user', async () => {
  const result = await subject.execute(EMAIL, PASSWORD);

  expect(result).toBe(user);
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
