"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
const express_1 = __importDefault(require("express"));
const fileUploader_1 = require("../../helpers/fileUploader");
const router = express_1.default.Router();
const file_controller_1 = __importDefault(require("./file.controller"));
router.post('/upload-file', fileUploader_1.fileUploader.uploadFile, file_controller_1.default);
exports.FileRouter = router;
