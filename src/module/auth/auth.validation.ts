import { z } from 'zod'

const loginValidation = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
  }),
})

const forgetPasswordValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
  }),
})
const resettPasswordValidation = z.object({
  body: z.object({
    newPassword: z.string({
      required_error: 'Enter new strong password',
    }),
  }),
})

export const AuthValidition = {
  loginValidation,
  forgetPasswordValidation,
  resettPasswordValidation,
}
