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
import validate from "../middlewares/validation";
import EmailValidator from "../../util/validators/email-validator";
import StringValidator from "../../util/validators/string-validator";

const userRepository = new UserRepository();
const cryptography = new BcryptjsCryptography();
const userToken = new JsonWebToken(TOKEN_PRIVATE_KEY, TOKEN_EXPIRES_IN);
const userToUserDto = new UserToUserDto(userToken);
const loginService = new LoginService(userRepository, cryptography);
const signupService = new SignupService(userRepository, cryptography);
const authController = new AuthController(loginService, signupService, userToUserDto);

const router = Router();

const SIGNUP_SCHEMA = [
  ...new EmailValidator().body('email'),
  ...new StringValidator().body('password', { min: 6 }),
];
router.post(
  "/signup",
  validate(SIGNUP_SCHEMA),
  (req: Request, res: Response) => authController.signup(req, res),
);

const LOGIN_SCHEMA = [
  ...new EmailValidator().body('email'),
  ...new StringValidator().body('password', { min: 6 }),
];
router.post(
  "/login",
  validate(LOGIN_SCHEMA),
  (req: Request, res: Response) => authController.login(req, res),
);

export default router;
