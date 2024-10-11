import { agent } from 'supertest';

import app from '../app';
import Database from '../infra/models/database';

jest.mock('../infra/adapters/gravatar', () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: jest.fn().mockResolvedValue('gravatar-get'),
    };
  });
});

const database = new Database();

const EMAIL = 'auth-integration@email.com';
const PASSWORD = 'test-password';

describe("POST /auth/signup", () => {
  it("should return email and token when data is valid", async () => {
    const response = await agent(app)
      .post("/auth/signup")
      .send({ email: EMAIL, password: PASSWORD })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.email).toBe(EMAIL);
    expect(response.body.token).toBeTruthy();
  });
});

describe("POST /auth/login", () => {
  beforeAll(async () => {
    database.initialize();
    await database.reset();

    await agent(app)
      .post("/auth/signup")
      .send({ email: EMAIL, password: PASSWORD })
      .expect("Content-Type", /json/)
      .expect(200);
  })

  it("should return email and token when data is valid", async () => {
    const response = await agent(app)
      .post("/auth/login")
      .send({ email: EMAIL, password: PASSWORD })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.email).toBe(EMAIL);
    expect(response.body.token).toBeTruthy();
  });
});
