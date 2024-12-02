"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = __importDefault(require("./course.controller"));
const router = express_1.default.Router();
// PUT route for updating a course
router.put('/update-course/:courseId', course_controller_1.default);
exports.CourseRouter = router;
