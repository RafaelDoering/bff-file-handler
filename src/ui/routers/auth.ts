import { Router } from "express";

import AuthController from '../controllers/auth';
import SignupService from '../../app/use-cases/signup';
import LoginService from '../../app/use-cases/login';
import UserRepository from '../../infra/repository/user';
import BcryptjsCryptography from "../../infra/adapters/bcryptjs";
import JsonWebToken from "../../infra/adapters/jsonwebtoken";
import UserToUserDto from "../converters/userToUserDto";

const userRepository = new UserRepository();
const cryptography = new BcryptjsCryptography();
const token = new JsonWebToken('temporary-key', '1d');
const userToUserDto = new UserToUserDto(token);
const loginService = new LoginService(userRepository, cryptography);
const signupService = new SignupService(userRepository, cryptography);
const authController = new AuthController(loginService, signupService, userToUserDto);

const router = Router();

router.post(
  "/signup",
  (req, res) => authController.signup(req, res) as unknown as void,
);

router.post(
  "/login",
  (req, res) => authController.login(req, res) as unknown as void,
);

export default router;
