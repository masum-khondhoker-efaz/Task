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
exports.updateCourseService = void 0;
const course_model_1 = __importDefault(require("./course.model")); // Assuming you have a Course model
const handleApiError_1 = __importDefault(require("../../errors/handleApiError"));
const updateCourseService = (courseId, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the course by ID
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            throw new handleApiError_1.default(404, 'Course not found');
        }
        // Update course-level fields (title, description)
        if (courseData.title)
            course.title = courseData.title;
        if (courseData.description)
            course.description = courseData.description;
        // Update nested modules
        if (courseData.modules) {
            courseData.modules.forEach((moduleUpdate) => {
                const existingModule = course.modules.find((module) => { var _a, _b; return ((_a = module._id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = moduleUpdate._id) === null || _b === void 0 ? void 0 : _b.toString()); });
                if (existingModule) {
                    // Update existing module
                    if (moduleUpdate.moduleName) {
                        existingModule.moduleName = moduleUpdate.moduleName;
                    }
                    if (moduleUpdate.videos) {
                        moduleUpdate.videos.forEach((videoUpdate) => {
                            const existingVideo = existingModule.videos.find((video) => { var _a, _b; return ((_a = video._id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = videoUpdate._id) === null || _b === void 0 ? void 0 : _b.toString()); });
                            if (existingVideo) {
                                // Update existing video
                                if (videoUpdate.title) {
                                    existingVideo.title = videoUpdate.title;
                                }
                                if (videoUpdate.url) {
                                    existingVideo.url = videoUpdate.url;
                                }
                            }
                            else {
                                // Add new video
                                existingModule.videos.push(videoUpdate);
                            }
                        });
                    }
                }
                else {
                    // Add new module
                    course.modules.push(moduleUpdate);
                }
            });
        }
        const updatedCourse = yield course.save();
        return updatedCourse;
    }
    catch (error) {
        throw new handleApiError_1.default(500, 'Error updating course');
    }
});
exports.updateCourseService = updateCourseService;
exports.default = exports.updateCourseService;
