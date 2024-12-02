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
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../config"));
const handleApiError_1 = __importDefault(require("../../errors/handleApiError"));
const fileUploader = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        throw new handleApiError_1.default(400, 'No file uploaded');
    }
    try {
        const fileUrl = `${config_1.default.backend_base_url}/uploads/${file.filename}`;
        const filePath = path_1.default.join(process.cwd(), 'uploads', file.filename);
        return {
            url: fileUrl,
            size: file.size,
            type: file.mimetype,
            path: filePath,
        };
    }
    catch (error) {
        throw new handleApiError_1.default(500, 'Error processing file');
    }
});
exports.default = fileUploader;
