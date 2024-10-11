import fs from 'fs';
import { agent } from 'supertest';

import app from '../app';
import FileDto from '../ui/dtos/file';

jest.mock('../infra/adapters/gravatar', () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: jest.fn().mockResolvedValue('gravatar-get'),
    };
  });
});

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI4NjE5MzIyLCJleHAiOjE3Mjg3MDU3MjJ9.E111USkrGRK3VuomrZtS4IpT1dWDyffDXexdDOhRQYk';

const JSON_FILE_0_PATH = `${__dirname}/test-files/file-0.json`;
const CSV_FILE_0_PATH = `${__dirname}/test-files/file-0.csv`;
const CSV_FILE_1_PATH = `${__dirname}/test-files/file-1.csv`;
const CSV_FILE_2_PATH = `${__dirname}/test-files/file-2.csv`;

describe('POST /file/upload', () => {
  it('should upload the test files when files are csv', async () => {
    if (!fs.existsSync(CSV_FILE_0_PATH)) throw new Error(`${CSV_FILE_0_PATH} does not exist`);
    if (!fs.existsSync(CSV_FILE_1_PATH)) throw new Error(`${CSV_FILE_1_PATH} does not exist`);
    if (!fs.existsSync(CSV_FILE_2_PATH)) throw new Error(`${CSV_FILE_2_PATH} does not exist`);

    const response = await agent(app)
      .post('/file/upload')
      .attach('files', CSV_FILE_0_PATH)
      .attach('files', CSV_FILE_1_PATH)
      .attach('files', CSV_FILE_2_PATH)
      .set('Authorization', TOKEN)
      .expect(200);

    const files = response.body as FileDto[];

    expect(files).toHaveLength(3);
  })

  it('should not upload the test file when file is not csv', async () => {
    if (!await fs.existsSync(JSON_FILE_0_PATH)) throw new Error(`${JSON_FILE_0_PATH} does not exist`);

    await agent(app)
      .post('/file/upload')
      .attach('files', JSON_FILE_0_PATH)
      .set('Authorization', TOKEN)
      .expect(500);
  })
})


describe('DELETE /file', () => {
  it('should return 200 when file exists', async () => {
    const files: FileDto[] = [
      { path: CSV_FILE_0_PATH }
    ];

    await agent(app)
      .delete('/file')
      .send({ files: files })
      .set('Authorization', TOKEN)
      .expect(200);
  })
})
