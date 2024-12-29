"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    database: process.env.DATABASE_URL,
    port: process.env.PORT,
    salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    token: process.env.BCRYPT_TOKEN,
    reset_link: process.env.RESET_LIVE_URL,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
};
