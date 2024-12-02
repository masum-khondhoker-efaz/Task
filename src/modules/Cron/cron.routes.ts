import express from "express";
import processPayments  from "./cron.controller";

const router = express.Router();

router.get("/process-payments", processPayments);

export const CronRouter =  router;