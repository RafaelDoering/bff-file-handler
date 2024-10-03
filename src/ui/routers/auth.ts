import { Router } from "express";

import AuthController from '../controllers/auth';
import SignupService from '../../app/services/signup';
import LoginService from '../../app/services/login';
import UserRepository from '../../infra/repository/user';
import BcryptjsCryptography from "../../utils/cryptography/bcryptjs-cryptography";
import JsonWebToken from "../../utils/token/jsonwebtoken-token";

const userRepository = new UserRepository();
const cryptography = new BcryptjsCryptography();
const token = new JsonWebToken('temporary-key', '1d');
const loginService = new LoginService(userRepository, cryptography, token);
const signupService = new SignupService(userRepository, cryptography, token);
const authController = new AuthController(loginService, signupService);

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
