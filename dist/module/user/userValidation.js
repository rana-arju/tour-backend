"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name must be provided and must be a string',
        })
            .min(3)
            .max(50),
        age: zod_1.z
            .number({
            required_error: 'Age must be provided and must be a number',
        })
            .int()
            .positive()
            .optional(),
        password: zod_1.z.string({
            required_error: 'Password must be provided and must be a string',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email must be provided and must be a string',
        })
            .email(),
        photo: zod_1.z
            .string({
            required_error: 'Photo must be provided and must be a string',
        })
            .optional(),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
