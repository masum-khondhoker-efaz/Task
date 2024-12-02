"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronRouter = void 0;
const express_1 = __importDefault(require("express"));
const cron_controller_1 = __importDefault(require("./cron.controller"));
const router = express_1.default.Router();
router.get("/process-payments", cron_controller_1.default);
exports.CronRouter = router;
