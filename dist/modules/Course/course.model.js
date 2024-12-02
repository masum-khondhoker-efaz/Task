"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
});
const moduleSchema = new mongoose_1.default.Schema({
    moduleName: { type: String, required: true },
    videos: [videoSchema],
});
const courseSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    modules: [moduleSchema],
}, { timestamps: true,
    versionKey: false
});
const Course = mongoose_1.default.model('courses', courseSchema);
exports.default = Course;
