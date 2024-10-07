import DeleteFileUseCase from './delete-files';
import Files from '../../domain/files';
import User from '../../domain/user';

const filesMock = {
  bulkCreate: jest.fn(),
  bulkDelete: jest.fn()
} as jest.Mocked<Files>;

const subject = new DeleteFileUseCase(filesMock);

const user: User = {
  id: 1,
  email: 'test-email',
  password: 'test-password',
};

const paths: string[] = ['file-1.csv'];

beforeAll(() => {
  filesMock.bulkDelete.mockResolvedValue();
})

test('return void when repository return void', async () => {
  const result = await subject.execute(paths, user);

  expect(result).toBeUndefined();
});
