import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name must be provided and must be a string',
      })
      .min(3)
      .max(50),

    age: z
      .number({
        required_error: 'Age must be provided and must be a number',
      })
      .int()
      .positive()
      .optional(),
    password: z.string({
      required_error: 'Password must be provided and must be a string',
    }),

    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email(),

    photo: z
      .string({
        required_error: 'Photo must be provided and must be a string',
      })
      .optional(),
  }),
})

export const UserValidation = {
  userValidationSchema,
}
