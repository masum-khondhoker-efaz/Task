import { Request, Response } from "express";
import { processPaymentsService } from "./cron.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// Controller method to process payments
const processPayments = async (req: Request, res: Response) => {
    try {
        // Call the service function to handle payment processing logic
        await processPaymentsService();
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "Payments processed successfully.",
        });
    } catch (error) {
        console.error("Error during payment processing:", error);
        sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Error processing payments.",
        });
    }
};

export default processPayments;