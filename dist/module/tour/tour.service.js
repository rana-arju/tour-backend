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
exports.tourService = void 0;
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const tour_model_1 = __importDefault(require("./tour.model"));
const createTour = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await Tour.create(payload)
    const data = new tour_model_1.default(payload);
    //   data.color = "red"
    const result = yield data.save();
    return result;
});
const getTours = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // //{searterm: "searter"}
    // console.log("main",query);
    // const queryObj= {...query};
    // const excludingImportant =["searchTerm", "page", "limit","sortOrder", "sortBy", "fields"];
    // // jesob field amdr filtering a drkr nei sesob baad dicchi
    // excludingImportant.forEach(key=> delete queryObj[key]);
    // console.log(queryObj);
    // const searchTerm = query?.searchTerm || '';
    // // "name", "startLocation", "locations"
    // const searchableFields = ["name", "startLocation", "locations"]
    // // const result = await Tour.find({$or: [
    // //   {name: {$regex: searchTerm, $options: "i"}},
    // //   {startLocation: {$regex: searchTerm, $options: "i"}},
    // //   {locations: {$regex: searchTerm, $options: "i"}}
    // // ]})
    // // const result = await Tour.find({$and:[{$or: searchableFields.map((field)=> ({[field]: {$regex: searchTerm, $options: "i"}}))}]},queryObj);
    // const searchQuery =  Tour.find({$or: searchableFields.map((field)=> ({[field]: {$regex: searchTerm, $options: "i"}}))});
    // // filtering
    // // const result = await searchQuery.find(queryObj);
    // const filterQuery =  searchQuery.find(queryObj);
    // // 1 -->10 {4-> 31-40
    // // skip limit
    // const page = Number(query?.page)|| 1;
    // const limit = Number(query?.limit) || 10;
    // // skip = (page-1)*limit
    // const skip = (page-1)*limit;
    // // const result = await filterQuery.skip(skip).limit(limit)
    // const paginatedQuery = filterQuery.skip(skip).limit(limit);
    // let sortStr;
    // if(query?.sortBy&& query?.sortOrder){
    //     const sortBy = query?.sortBy;
    //     const sortOrder = query?.sortOrder;
    //     // "-price" othoba "price"
    //      sortStr = `${sortOrder ==="desc"?'-':''}${sortBy}`
    // }
    // // const result = await paginatedQuery.sort(sortStr);
    // const sortQuery =  paginatedQuery.sort(sortStr);
    // let fields = "-__v";
    // if(query?.fields){
    //   fields = (query.fields as string)?.split(",").join(" ");
    //  }
    //  const result = await sortQuery.select(fields);
    //  (modelQuery,query )=>{...}
    // modelQuery.model.schema.path
    const searchableFields = ["name", "startLocation", "locations"];
    const tours = new querybuilder_1.default(tour_model_1.default.find(), query).search(searchableFields).filter().sort().paginate().select();
    const result = yield tours.modelQuery;
    return result;
});
const getSingleTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = tour_model_1.default.findById(id);
    return result;
});
const updateTour = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = tour_model_1.default.findByIdAndUpdate(id, payload);
    return result;
});
const deleteTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = tour_model_1.default.findByIdAndDelete(id);
    return result;
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNextSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield tour_model_1.default.getNextNearestStartDateAndEndData();
    //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()
    return {
        tour,
        // nextSchedule,
    };
});
exports.tourService = {
    createTour,
    getTours,
    getSingleTour,
    updateTour,
    deleteTour,
    getNextSchedule,
};
