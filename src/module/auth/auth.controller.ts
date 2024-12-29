// req and res manage

import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authService } from './auth.service'
import { JwtPayload } from 'jsonwebtoken'

const userRegister = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await authService.RegisterUser(payload)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User registration successfully',
    data: result,
  })
})
const userLogin = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await authService.loginUser(payload)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User login successful',
    data: result,
  })
})
const forgetPassword = catchAsync(async (req, res) => {
  const payload = req.body

  await authService.forgetPassword(payload)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Password reset emeail send. Please check your email.',
    data: null,
  })
})
const resetPassword = catchAsync(async (req, res) => {
  const payload = req.body
  const user = req.user

  await authService.resetPassword(payload, user as JwtPayload)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Password reset successfully',
    data: null,
  })
})

export const authController = {
  userRegister,
  userLogin,
  forgetPassword,
  resetPassword,
}
