"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const userValidation_1 = require("../user/userValidation");
const auth_validation_1 = require("./auth.validation");
const auth_1 = require("../../middlewares/auth");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validationRequest_1.validationRequest)(userValidation_1.UserValidation.userValidationSchema), auth_controller_1.authController.userRegister);
authRouter.post('/login', (0, validationRequest_1.validationRequest)(auth_validation_1.AuthValidition.loginValidation), auth_controller_1.authController.userLogin);
authRouter.post('/forget-password', (0, validationRequest_1.validationRequest)(auth_validation_1.AuthValidition.forgetPasswordValidation), auth_controller_1.authController.forgetPassword);
authRouter.post('/reset-password', (0, auth_1.auth)('user', 'admin'), (0, validationRequest_1.validationRequest)(auth_validation_1.AuthValidition.resettPasswordValidation), auth_controller_1.authController.resetPassword);
exports.default = authRouter;
