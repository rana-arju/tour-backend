import config from '../../config'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const RegisterUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload)

  return result
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

export const authService = {
  RegisterUser,
  loginUser,
}
