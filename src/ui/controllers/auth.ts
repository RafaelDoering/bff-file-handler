import { StatusCode, type Request, type Response } from "../http-client";
import LoginUseCase from "../../app/use-cases/login";
import SignupUseCase from "../../app/use-cases/signup";
import UserToUserDto from "../converters/userToUserDto";

export default class AuthController {
  constructor(private loginUseCase: LoginUseCase, private signupUseCase: SignupUseCase, private userToUserDto: UserToUserDto) { }

  public async signup(req: Request, res: Response) {
    const { email, password } = req.body;

    const createdUser = await this.signupUseCase.execute(email, password);

    return res.status(StatusCode.OK).json(this.userToUserDto.convert(createdUser));
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const foundUser = await this.loginUseCase.execute(email, password);

    return res.status(StatusCode.OK).json(this.userToUserDto.convert(foundUser));
  }
}
