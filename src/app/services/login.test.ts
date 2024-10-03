import UserNotFound from '../../domain/errors/userNotFound';
import WrongPassword from '../../domain/errors/wrongPassword';
import User from '../../domain/user';
import Users from '../../domain/users';
import Cryptography from '../../utils/cryptography/cryptography';
import Token from '../../utils/token/token';
import LoginService from './login';

const usersMock = {
  findByEmail: jest.fn(),
  create: jest.fn()
} as jest.Mocked<Users>;

const cryptographyMock = {
  hash: jest.fn(),
  compare: jest.fn()
} as jest.Mocked<Cryptography>;

const tokenMock = {
  encode: jest.fn(),
  decode: jest.fn()
} as jest.Mocked<Token>;

const subject = new LoginService(usersMock, cryptographyMock, tokenMock);

const ID = 1;
const EMAIL = 'test-email';
const PASSWORD = 'test-password';
const TOKEN = 'test-token';

const user: User = {
  id: ID,
  email: EMAIL,
  password: PASSWORD
};

beforeEach(() => {
  usersMock.findByEmail.mockResolvedValue(user);
  cryptographyMock.compare.mockResolvedValue(true);
  tokenMock.encode.mockReturnValue(TOKEN);
})

test('return token when repository return user and cryptography return true', async () => {
  const result = await subject.execute(EMAIL, PASSWORD);

  expect(result).toEqual({ ...user, token: TOKEN });
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
