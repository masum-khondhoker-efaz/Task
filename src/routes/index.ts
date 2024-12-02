import express from 'express';
import { CronRouter } from '../modules/Cron/cron.routes';
import { path } from 'pdfkit';
import { FileRouter } from '../modules/File/file.routes';
import { CourseRouter } from '../modules/Course/course.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/cron",
    route: CronRouter,
  },
  {
    path: "/file",
    route: FileRouter,
  },
  {
    path: "/course",
    route: CourseRouter
  }
 

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
