"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const cron_routes_1 = require("../modules/Cron/cron.routes");
const file_routes_1 = require("../modules/File/file.routes");
const course_routes_1 = require("../modules/Course/course.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/cron",
        route: cron_routes_1.CronRouter,
    },
    {
        path: "/file",
        route: file_routes_1.FileRouter,
    },
    {
        path: "/course",
        route: course_routes_1.CourseRouter
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.routes = router;
