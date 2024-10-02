import EmailAlreadyUsed from '../../domain/errors/emailAlreadyUsed';
import User from '../../domain/user';
import Users from '../../domain/users';
import SignupService from './signup';

const usersMock = {
  findByEmail: jest.fn(),
  create: jest.fn()
} as jest.Mocked<Users>;

const subject = new SignupService(usersMock);

const ID = 1;
const EMAIL = 'test-email';
const PASSWORD = 'test-password';

const user: User = {
  id: ID,
  email: EMAIL,
  password: PASSWORD
};

beforeAll(() => {
  usersMock.findByEmail.mockResolvedValue(undefined);
  usersMock.create.mockResolvedValue(user);
})

test('return user when repository return user', async () => {
  const result = await subject.execute(EMAIL, PASSWORD);

  expect(result).toBe(user);
});

test('throw UserNotFound when user is not found', async () => {
  usersMock.findByEmail.mockResolvedValueOnce(user);

  await expect(subject.execute(EMAIL, PASSWORD))
    .rejects
    .toThrow(EmailAlreadyUsed);
});
