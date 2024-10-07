import { Next, Request, Response, StatusCode, StatusCodeReason } from '../http-client';
import JsonWebToken from "../../infra/adapters/jsonwebtoken";
import AuthenticateUseCase from "../../app/use-cases/authenticate";
import UserRepository from "../../infra/repository/user";
import { TOKEN_EXPIRES_IN, TOKEN_PRIVATE_KEY } from "../../env";

const userRepository = new UserRepository();
const userToken = new JsonWebToken(TOKEN_PRIVATE_KEY, TOKEN_EXPIRES_IN);
const authenticateUseCase = new AuthenticateUseCase(userRepository, userToken);

export default async function authenticate(req: Request, res: Response, next: Next) {
  try {
    const token = req.header("Authorization");

    req.user = await authenticateUseCase.execute(token);

    next();
  } catch (error) {
    res.status(StatusCode.UNAUTHORIZED).json(StatusCodeReason.UNAUTHORIZED);
  }
};
