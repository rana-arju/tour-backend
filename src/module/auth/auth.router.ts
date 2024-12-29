import { Router } from 'express'
import { authController } from './auth.controller'
import { validationRequest } from '../../middlewares/validationRequest'
import { UserValidation } from '../user/userValidation'
import { AuthValidition } from './auth.validation'
import { auth } from '../../middlewares/auth'

const authRouter = Router()

authRouter.post(
  '/register',
  validationRequest(UserValidation.userValidationSchema),
  authController.userRegister
)
authRouter.post(
  '/login',
  validationRequest(AuthValidition.loginValidation),
  authController.userLogin
)
authRouter.post(
  '/forget-password',
  validationRequest(AuthValidition.forgetPasswordValidation),
  authController.forgetPassword
)
authRouter.post(
  '/reset-password',
  auth('user', 'admin'),
  validationRequest(AuthValidition.resettPasswordValidation),
  authController.resetPassword
)

export default authRouter
