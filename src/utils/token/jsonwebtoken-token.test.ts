import Token from './jsonwebtoken-token';

const OBJ = {
  id: 1
};

const subject = new Token("test-key", "1d");

test('return obj when decode is called with encoded obj', async () => {
  const encodedObj = await subject.encode(OBJ);
  const result = await subject.decode(encodedObj);

  expect(result).toMatchObject(OBJ);
});
