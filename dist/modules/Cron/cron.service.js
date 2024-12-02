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
exports.processPaymentsService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const cron_model_1 = __importDefault(require("./cron.model"));
const authorize_net_1 = require("../../helpers/authorize.net");
const processPaymentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting payment processing...");
    const users = yield cron_model_1.default.find({
        planEndDate: { $lt: new Date() },
        status: "active",
    });
    console.log(`Found ${users.length} users with expired plans.`);
    for (const user of users) {
        console.log(`Processing payment for user: ${user.email}`);
        try {
            const paymentResult = yield (0, authorize_net_1.chargeCustomer)(user.paymentDetails, 97);
            const updateData = {
                lastPaymentStatus: paymentResult.success ? 'success' : 'failure',
                lastPaymentDate: new Date(),
                paymentResponse: paymentResult, // Store the entire payment result JSON
            };
            if (paymentResult.success) {
                console.log(`Payment successful for user: ${user.email}`);
            }
            else {
                console.log(`Payment failed for user: ${user.email}`);
            }
            yield cron_model_1.default.updateOne({ _id: user._id }, updateData);
            console.log(`Updated user ${user.email} with payment result.`);
        }
        catch (error) {
            console.error(`Error processing payment for user: ${user.email}`, error);
            const errorMessage = error.message;
            yield cron_model_1.default.updateOne({ _id: user._id }, {
                lastPaymentStatus: 'failure',
                lastPaymentDate: new Date(),
                paymentResponse: { error: errorMessage }, // Store the error message
            });
            console.log(`Updated user ${user.email} with error result.`);
        }
    }
    console.log("Finished payment processing.");
});
exports.processPaymentsService = processPaymentsService;
node_cron_1.default.schedule("0 0 * * *", exports.processPaymentsService);
