"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const userValidation_1 = require("../user/userValidation");
const auth_validation_1 = __importDefault(require("./auth.validation"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validationRequest_1.validationRequest)(userValidation_1.UserValidation.userValidationSchema), auth_controller_1.authController.userRegister);
authRouter.post('/login', (0, validationRequest_1.validationRequest)(auth_validation_1.default), auth_controller_1.authController.userLogin);
exports.default = authRouter;
