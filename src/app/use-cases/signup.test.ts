import EmailAlreadyUsed from '../../domain/errors/emailAlreadyUsed';
import User from '../../domain/user';
import Users from '../../domain/users';
import CryptographyPort from '../ports/cryptography';
import SignupUseCase from './signup';

const usersMock = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn()
} as jest.Mocked<Users>;

const cryptographyMock = {
  hash: jest.fn(),
  compare: jest.fn()
} as jest.Mocked<CryptographyPort>;

const subject = new SignupUseCase(usersMock, cryptographyMock);

const ID = 1;
const EMAIL = 'test-email';
const PASSWORD = 'test-password';
const HASHED_PASSWORD = 'hashed-test-password';

const user: User = {
  id: ID,
  email: EMAIL,
  password: PASSWORD
};

beforeAll(() => {
  usersMock.findByEmail.mockResolvedValue(undefined);
  usersMock.create.mockResolvedValue(user);
  cryptographyMock.hash.mockResolvedValue(HASHED_PASSWORD);
})

test('return token when repository return user', async () => {
  const result = await subject.execute(EMAIL, PASSWORD);

  expect(result).toEqual(user);
});

test('throw UserNotFound when user is not found', async () => {
  usersMock.findByEmail.mockResolvedValueOnce(user);

  await expect(subject.execute(EMAIL, PASSWORD))
    .rejects
    .toThrow(EmailAlreadyUsed);
});
