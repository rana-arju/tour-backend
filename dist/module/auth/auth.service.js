"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RegisterUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }
    if (user.userStatus === 'inactive') {
        throw new Error('User is inactive');
    }
    const passwordCheck = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!passwordCheck) {
        throw new Error('Invalid password');
    }
    const userData = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const token = jsonwebtoken_1.default.sign(userData, config_1.default.token, {
        expiresIn: '30d',
    });
    const verifiedUser = {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user.id,
        token: token,
    };
    return verifiedUser;
});
exports.authService = {
    RegisterUser,
    loginUser,
};
