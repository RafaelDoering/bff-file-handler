import { Router } from "express";

import { Request, Response } from '../http-client';
import AuthController from '../controllers/auth';
import SignupService from '../../app/use-cases/signup';
import LoginService from '../../app/use-cases/login';
import UserRepository from '../../infra/repository/user';
import BcryptjsCryptography from "../../infra/adapters/bcryptjs";
import JsonWebToken from "../../infra/adapters/jsonwebtoken";
import UserToUserDto from "../converters/userToUserDto";
import { TOKEN_EXPIRES_IN, TOKEN_PRIVATE_KEY } from "../../env";

const userRepository = new UserRepository();
const cryptography = new BcryptjsCryptography();
const userToken = new JsonWebToken(TOKEN_PRIVATE_KEY, TOKEN_EXPIRES_IN);
const userToUserDto = new UserToUserDto(userToken);
const loginService = new LoginService(userRepository, cryptography);
const signupService = new SignupService(userRepository, cryptography);
const authController = new AuthController(loginService, signupService, userToUserDto);

const router = Router();

router.post(
  "/signup",
  (req: Request, res: Response) => authController.signup(req, res) as unknown as void,
);

router.post(
  "/login",
  (req: Request, res: Response) => authController.login(req, res) as unknown as void,
);

export default router;
