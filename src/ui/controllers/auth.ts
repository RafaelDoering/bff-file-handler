import { StatusCode, type Request, type Response } from "../http-client";
import LoginUseCase from "../../app/use-cases/login";
import SignupUseCase from "../../app/use-cases/signup";
import UserToUserDto from "../converters/userToUserDto";
import EmailAlreadyUsed from "../../domain/errors/emailAlreadyUsed";

export default class AuthController {
  constructor(private loginUseCase: LoginUseCase, private signupUseCase: SignupUseCase, private userToUserDto: UserToUserDto) { }

  public async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const createdUser = await this.signupUseCase.execute(email, password);

      res.status(StatusCode.OK).json(this.userToUserDto.convert(createdUser));
    } catch (error) {
      if (error instanceof EmailAlreadyUsed) {
        res.status(StatusCode.BAD_REQUEST).json(error.message);
        return;
      }
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const foundUser = await this.loginUseCase.execute(email, password);

    res.status(StatusCode.OK).json(this.userToUserDto.convert(foundUser));
  }
}
