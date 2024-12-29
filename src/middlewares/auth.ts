import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import User from '../module/user/user.model'

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new Error('You are unauthorized to access')
    }
    const decoded = jwt.verify(token, config?.token as string) as JwtPayload
    const { role, email } = decoded
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized to access this resource')
    }
    const user = await User.findOne({ email }).select('+password')
    const isInactive = user?.userStatus === 'inactive'
    if (isInactive) {
      throw new Error('You are already inactive')
    }
    req.user = decoded as JwtPayload

    next()
  })
}
