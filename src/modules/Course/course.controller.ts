import { Request, Response, NextFunction } from 'express';
import { updateCourseService } from './course.service'; // Import the service
import sendResponse from '../../shared/sendResponse'; // Adjust the path as necessary
import { StatusCodes } from 'http-status-codes';

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;
    const courseData = req.body;

    try {
        const updatedCourse = await updateCourseService(courseId, courseData);
        if (!updatedCourse) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Course not found',
                data: null
            });
        }
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'Course updated successfully',
            data: updatedCourse
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};

export default updateCourse;
