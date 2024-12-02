import mongoose from 'mongoose';
import { ICourse } from './course.interface';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const moduleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  videos: [videoSchema],
});

const courseSchema = new mongoose.Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    modules: [moduleSchema],  
  },
  { timestamps: true,
    versionKey: false 
   }
);

const Course = mongoose.model<ICourse>('courses', courseSchema);

export default Course;
