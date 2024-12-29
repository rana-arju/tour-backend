import config from '../../config'
import sendEmail from '../../utils/sendEmail'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

const RegisterUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload)

  return result
}
const forgetPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email })
  if (!user) {
    throw new Error(`User ${payload.email} not found`)
  }
  if (user.userStatus === 'inactive') {
    throw new Error('You can not recover password because you are not eligible')
  }
  const userData = {
    email: user?.email,
    role: user?.role,
  }
  const token = jwt.sign(userData, config.token as string, {
    expiresIn: '10m',
  })
  const resetLink = `http://localhost:3000/reset-password?id=${user._id}&token=${token}`
  sendEmail(user.email, resetLink)
}
const loginUser = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password')

  if (!user) {
    throw new Error('User not found')
  }
  if (user.userStatus === 'inactive') {
    throw new Error('User is inactive')
  }
  const passwordCheck = await bcrypt.compare(
    payload.password as string,
    user.password as string
  )

  if (!passwordCheck) {
    throw new Error('Invalid password')
  }

  const userData = {
    email: user?.email,
    role: user?.role,
  }
  const token = jwt.sign(userData, config.token as string, {
    expiresIn: '30d',
  })
  const verifiedUser = {
    name: user.name,
    email: user.email,
    role: user.role,
    _id: user.id,
    token: token,
  }
  return verifiedUser
}

const resetPassword = async (
  payload: { newPassword: string },
  user: JwtPayload
) => {
  const userExist = await User.findOne({ email: user.email })

  if (!userExist) {
    throw new Error('User not found')
  }
  if (userExist.userStatus === 'inactive') {
    throw new Error('User is inactive')
  }
  const password = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_rounds)
  )

  const result = await User.findByIdAndUpdate(userExist._id, {
    password,
  })

  return result
}

export const authService = {
  RegisterUser,
  loginUser,
  forgetPassword,
  resetPassword,
}
