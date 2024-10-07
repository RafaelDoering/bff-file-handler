import User from '../../domain/user';
import File from '../../domain/file';
import AddFileUseCase from './add-files';
import Files from '../../domain/files';

const filesMock = {
  bulkCreate: jest.fn(),
  bulkDelete: jest.fn()
} as jest.Mocked<Files>;

const subject = new AddFileUseCase(filesMock);

const user: User = {
  id: 1,
  email: 'test-email',
  password: 'test-password',
};

const file: File = {
  id: 1,
  path: 'file-1.csv',
  user,
};

beforeAll(() => {
  filesMock.bulkCreate.mockResolvedValue([file]);
})

test('return file when repository return file', async () => {
  const result = await subject.execute([file.path], user);

  expect(result[0]).toEqual(file);
});
