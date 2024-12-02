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
const course_service_1 = require("./course.service"); // Import the service
const sendResponse_1 = __importDefault(require("../../shared/sendResponse")); // Adjust the path as necessary
const http_status_codes_1 = require("http-status-codes");
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const courseData = req.body;
    try {
        const updatedCourse = yield (0, course_service_1.updateCourseService)(courseId, courseData);
        if (!updatedCourse) {
            return (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                message: 'Course not found',
                data: null
            });
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'Course updated successfully',
            data: updatedCourse
        });
    }
    catch (error) {
        next(error); // Pass the error to the global error handler
    }
});
exports.default = updateCourse;
