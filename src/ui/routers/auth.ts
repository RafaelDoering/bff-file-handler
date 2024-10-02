import { Router } from "express";

import AuthController from '../controllers/auth';
import SignupService from '../../app/services/signup';
import LoginService from '../../app/services/login';
import UserRepository from '../../infra/repository/user';

const userRepository = new UserRepository();
const loginService = new LoginService(userRepository);
const signupService = new SignupService(userRepository);
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
