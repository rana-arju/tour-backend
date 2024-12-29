"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const booking_route_1 = __importDefault(require("./module/booking/booking.route"));
const tour_route_1 = __importDefault(require("./module/tour/tour.route"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use('/api/user', user_router_1.default);
app.use('/api/tour', tour_route_1.default);
app.use('/api/booking', booking_route_1.default);
app.use('/api/auth', auth_router_1.default);
// POST: /api/user/create-user
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server Live ⚡',
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'Route not found',
    });
});
exports.default = app;
// req, res > jwt funtion next() > function
// express -> workflow =
// train -> [router]-[controller -error]-[service - error]-[errorHandler]->
