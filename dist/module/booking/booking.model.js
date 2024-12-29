"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    tour: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    bookedSlots: {
        type: Number,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending',
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;
