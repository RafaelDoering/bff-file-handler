export default class EmailAlreadyUsed extends Error {
  constructor() {
    super("Email already used");
  }
};
