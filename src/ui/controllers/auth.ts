import type { Request, Response } from "express";

import Login from "../../app/services/login";
import Signup from "../../app/services/signup";
import UserWithTokenToUserWithTokenDto from "../converters/userWithTokenToUserWithTokenDto";

export default class AuthController {
  private userWithTokenToUserWithTokenDto: UserWithTokenToUserWithTokenDto;

  constructor(private loginService: Login, private signupService: Signup) {
    this.userWithTokenToUserWithTokenDto = new UserWithTokenToUserWithTokenDto();
  }

  public async signup(req: Request, res: Response) {
    const { email, password } = req.body;

    const createdUser = await this.signupService.execute(email, password);

    return res.status(200).json(this.userWithTokenToUserWithTokenDto.convert(createdUser));
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const foundUser = await this.loginService.execute(email, password);

    return res.status(200).json(this.userWithTokenToUserWithTokenDto.convert(foundUser));
  }
}
