import { Router } from 'express'
import { authController } from './auth.controller'
import { validationRequest } from '../../middlewares/validationRequest'
import { UserValidation } from '../user/userValidation'
import loginValidation from './auth.validation'

const authRouter = Router()

authRouter.post(
  '/register',
  validationRequest(UserValidation.userValidationSchema),
  authController.userRegister
)
authRouter.post(
  '/login',
  validationRequest(loginValidation),
  authController.userLogin
)
authRouter.post(
  '/forget-password',
  validationRequest(loginValidation),
  authController.userLogin
)

export default authRouter
