import express from 'express';
import updateCourse from './course.controller';

const router = express.Router();

// PUT route for updating a course
router.put('/update-course/:courseId', updateCourse);

export const CourseRouter = router;