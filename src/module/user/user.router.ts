import {  Router } from 'express'
import { userController } from './user.controller'
import { UserValidation } from './userValidation'
import { auth } from '../../middlewares/auth'
import { validationRequest } from '../../middlewares/validationRequest'

const userRouter = Router()

userRouter.post(
  '/create-user',
  validationRequest(UserValidation.userValidationSchema),
  userController.createUser
)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', auth('user', 'admin'), userController.getUser)

export default userRouter
