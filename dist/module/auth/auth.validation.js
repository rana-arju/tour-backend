"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidition = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
    }),
});
const forgetPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
    }),
});
const resettPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: zod_1.z.string({
            required_error: 'Enter new strong password',
        }),
    }),
});
exports.AuthValidition = {
    loginValidation,
    forgetPasswordValidation,
    resettPasswordValidation,
};
