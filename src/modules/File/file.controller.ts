import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import fileUploader from "./file.service";

const uploadFile = async (req: Request, res: Response) => {
  try {
    const result = await fileUploader(req);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'File uploaded successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: (error instanceof Error) ? error.message : 'An unknown error occurred',
    });
  }
};

export default uploadFile;