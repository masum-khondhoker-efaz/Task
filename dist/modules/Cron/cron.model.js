"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    planStartDate: Date,
    planEndDate: Date,
    paymentDetails: {
        cardNumber: String,
        cvc: String,
        expiryDate: String,
    },
    lastPaymentStatus: String,
    lastPaymentDate: Date,
    paymentResponse: mongoose_1.default.Schema.Types.Mixed,
}, { timestamps: true, versionKey: false });
const User = mongoose_1.default.model('users', userSchema);
exports.default = User;
