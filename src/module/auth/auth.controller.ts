// req and res manage

import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authService } from './auth.service'

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
    data: result
  })
})

export const authController = {
  userRegister,
  userLogin,
}
