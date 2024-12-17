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
exports.BookingService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tour_model_1 = __importDefault(require("../tour/tour.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const { tour, bookedSlots } = payload
    // const requiredTour = await Tour.findById(tour)
    // if (!requiredTour) {
    //     throw new Error('Tour not found')
    // }
    // const totalPrice = requiredTour.price * bookedSlots
    // payload.totalPrice = totalPrice
    // payload.bookingStatus = 'pending'
    // if (requiredTour.availableSeats < bookedSlots) {
    //     throw new Error('Not enough seats available')
    // }
    // const booking = await Booking.create(payload)
    // // throw new Error('Failed to create booking');
    // // availableSeats = availableSeats - bookedSlots
    // const updatedTour = await Tour.findByIdAndUpdate(tour, { $inc: { availableSeats: -bookedSlots } }, { new: true });
    // console.log(updatedTour);
    // if (!updatedTour) {
    //     throw new Error('Failed to update tour')
    // }
    // return booking
    // Clone database
    // sandbox - test database
    // database - error 
    // database - delete
    // database - success
    // database - merge
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { tour, bookedSlots } = payload;
        const requiredTour = yield tour_model_1.default.findById(tour);
        if (!requiredTour) {
            throw new Error('Tour not found');
        }
        const totalPrice = requiredTour.price * bookedSlots;
        payload.totalPrice = totalPrice;
        payload.bookingStatus = 'pending';
        if (requiredTour.availableSeats < bookedSlots) {
            throw new Error('Not enough seats available');
        }
        const booking = yield booking_model_1.default.create([payload], { session });
        console.log(booking);
        // throw new Error('Failed to create booking');
        // availableSeats = availableSeats - bookedSlots
        const updatedTour = yield tour_model_1.default.findByIdAndUpdate(booking[0].tour, { $inc: { availableSeats: -bookedSlots } }, { new: true, session });
        // console.log(updatedTour);
        if (!updatedTour) {
            throw new Error('Failed to update tour');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return booking[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
/**
 *
 * Booking update -
 *
 * Booking cancel - Booking Model
 *
 * Tour AvailableSeats =   availableSeats + BookedSlot  - Tour Model
 *
 */
exports.BookingService = {
    createBooking
};
