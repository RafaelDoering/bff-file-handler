import Cryptography from './bcryptjs-cryptography';

const STR = "test-string";

const subject = new Cryptography();

test('return true when hash is from string', async () => {
  const hash = await subject.hash(STR);
  const result = await subject.compare(STR, hash);

  expect(result).toBeTruthy();
});

test('return false when hash is not from string', async () => {
  const hash = await subject.hash(STR);
  const result = await subject.compare("not-the-test-string", hash);

  expect(result).toBeFalsy();
});
