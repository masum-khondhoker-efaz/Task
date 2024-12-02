import express from "express";
import { fileUploader } from "../../helpers/fileUploader";
const router = express.Router();
import  uploadFile  from "./file.controller";

router.post(
    '/upload-file',
    fileUploader.uploadFile,
    uploadFile,
    
  );

  export const FileRouter = router;