import type { Request, Response, Next } from "../http-client";
import AuthenticateUseCase from "../../app/use-cases/authenticate";

export default class AuthMiddleware {
  constructor(private authenticateUseCase: AuthenticateUseCase) { }

  public async signup(req: Request, res: Response, next: Next) {
    let token = req.header("Authorization");

    req.user = await this.authenticateUseCase.execute(token);

    next();
  }
}
