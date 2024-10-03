import EmailAlreadyUsed from '../../domain/errors/emailAlreadyUsed';
import User from '../../domain/user';
import Users from '../../domain/users';
import Cryptography from '../../utils/cryptography/cryptography';
import Token from '../../utils/token/token';
import SignupService from './signup';

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

const subject = new SignupService(usersMock, cryptographyMock, tokenMock);

const ID = 1;
const EMAIL = 'test-email';
const PASSWORD = 'test-password';
const HASHED_PASSWORD = 'hashed-test-password';
const TOKEN = 'test-token';

const user: User = {
  id: ID,
  email: EMAIL,
  password: PASSWORD
};

beforeAll(() => {
  usersMock.findByEmail.mockResolvedValue(undefined);
  usersMock.create.mockResolvedValue(user);
  cryptographyMock.hash.mockResolvedValue(HASHED_PASSWORD);
  tokenMock.encode.mockReturnValue(TOKEN);
})

test('return token when repository return user', async () => {
  const result = await subject.execute(EMAIL, PASSWORD);

  expect(result).toEqual({ ...user, token: TOKEN });
});

test('throw UserNotFound when user is not found', async () => {
  usersMock.findByEmail.mockResolvedValueOnce(user);

  await expect(subject.execute(EMAIL, PASSWORD))
    .rejects
    .toThrow(EmailAlreadyUsed);
});
