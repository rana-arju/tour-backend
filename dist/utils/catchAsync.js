"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch((error) => next(error));
    };
};
exports.default = catchAsync;
// catchAsync(async (req, res) => {
//     const result = await userService.getUser()
//     sendResponse(res, {
//       statusCode: StatusCodes.OK,
//       message: 'Users getting successfully',
//       data: result,
//     })
// })
// function createOperation(func: (a: number, b: number) => number) {
//   return func
// }
// const add = createOperation((a, b) => a + b)
// const multiply = createOperation((a, b) => a * b)
// console.log(add(3, 5))
// console.log(multiply(3, 5))
