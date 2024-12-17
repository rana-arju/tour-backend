"use strict";
// create booking
// get all booking
// get booking by id
// get booking by user id = myBookings
// update booking
// delete booking = soft delete
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const bookingRouter = express_1.default.Router();
bookingRouter.post('/create-booking', booking_controller_1.bookingController.createBooking);
exports.default = bookingRouter;
