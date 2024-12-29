import { z } from "zod";

const loginValidation = z.object({
    body: z.object({
        password: z.string({
            required_error: "Password is required"
           
        }),
        email: z.string({
            required_error: "Email is required"
        }).email(),
    })
})

export default loginValidation
