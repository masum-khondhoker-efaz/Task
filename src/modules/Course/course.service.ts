import Course from './course.model'; // Assuming you have a Course model
import ApiError from '../../errors/handleApiError';
import { ICourse } from './course.interface'; // Assuming you have an ICourse interface

export const updateCourseService = async (courseId: string, courseData: Partial<ICourse>) => {
  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    // Update course-level fields (title, description)
    if (courseData.title) course.title = courseData.title;
    if (courseData.description) course.description = courseData.description;

    // Update nested modules
    if (courseData.modules) {
      courseData.modules.forEach((moduleUpdate) => {
        const existingModule = course.modules.find(
          (module) => module._id?.toString() === moduleUpdate._id?.toString()
        );

        if (existingModule) {
          // Update existing module
          if (moduleUpdate.moduleName) {
            existingModule.moduleName = moduleUpdate.moduleName;
          }

          if (moduleUpdate.videos) {
            moduleUpdate.videos.forEach((videoUpdate) => {
              const existingVideo = existingModule.videos.find(
                (video) => video._id?.toString() === videoUpdate._id?.toString()
              );

              if (existingVideo) {
                // Update existing video
                if (videoUpdate.title) {
                  existingVideo.title = videoUpdate.title;
                }
                if (videoUpdate.url) {
                  existingVideo.url = videoUpdate.url;
                }
              } else {
                // Add new video
                existingModule.videos.push(videoUpdate);
              }
            });
          }
        } else {
          // Add new module
          course.modules.push(moduleUpdate);
        }
      });
    }

    const updatedCourse = await course.save();
    return updatedCourse;
  } catch (error) {
    throw new ApiError(500, 'Error updating course');
  }
};

export default updateCourseService;