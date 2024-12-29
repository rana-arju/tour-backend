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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourController = void 0;
const tour_service_1 = require("./tour.service");
const createTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield tour_service_1.tourService.createTour(body);
        res.send({
            success: true,
            message: 'Tour created successfully',
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const getTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tour_service_1.tourService.getTours(req.query);
        res.send({
            success: true,
            message: 'Tours get successfully',
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const getSingleTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield tour_service_1.tourService.getSingleTour(id);
        res.send({
            success: true,
            message: 'Tour get successfully',
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        const result = yield tour_service_1.tourService.updateTour(id, body);
        res.send({
            success: true,
            message: 'Tour updated successfully',
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield tour_service_1.tourService.deleteTour(id);
        res.send({
            success: true,
            message: 'Tour deleted successfully',
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const getNextSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield tour_service_1.tourService.getNextSchedule(id);
        res.send({
            success: true,
            message: 'Tour deleted successfully',
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.tourController = {
    createTour,
    getTours,
    getSingleTour,
    updateTour,
    deleteTour,
    getNextSchedule,
};
