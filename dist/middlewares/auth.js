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
exports.auth = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../module/user/user.model"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('You are unauthorized to access');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.token);
        const { role, email } = decoded;
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new Error('You are not authorized to access this resource');
        }
        const user = yield user_model_1.default.findOne({ email }).select('+password');
        const isInactive = (user === null || user === void 0 ? void 0 : user.userStatus) === 'inactive';
        if (isInactive) {
            throw new Error('You are already inactive');
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
