"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tourSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    durationHours: {
        type: Number,
        required: true,
    },
    averageRating: {
        type: Number,
        default: 5,
    },
    price: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true
    },
    coverImage: { type: String, required: true },
    images: [String],
    startDates: [Date],
    startLocation: { type: String },
    locations: [String],
    slug: String,
});
// StaticRange, instance
// tourSchema.methods.getNextNearestStartDateAndEndData = function () {
//   const today = new Date()
//   const futureDates = this.startDates.filter((startDate: Date) => {
//     return startDate > today
//   })
//   futureDates.sort((a: Date, b: Date) => a.getTime() - b.getDate())
//   const nearestStartDate = futureDates[0]
//   const estimatedEndDate = new Date(
//     nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000
//   )
//   return {
//     nearestStartDate,
//     estimatedEndDate,
//   }
// }
tourSchema.static('getNextNearestStartDateAndEndData', function getNextNearestStartDateAndEndData() {
    const today = new Date();
    const futureDates = this.startDates.filter((startDate) => {
        return startDate > today;
    });
    futureDates.sort((a, b) => a.getTime() - b.getDate());
    const nearestStartDate = futureDates[0];
    const estimatedEndDate = new Date(nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000);
    return {
        nearestStartDate,
        estimatedEndDate,
    };
});
const Tour = (0, mongoose_1.model)('Tour', tourSchema);
exports.default = Tour;
