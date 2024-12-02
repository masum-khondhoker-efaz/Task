import path from 'path';
import config from '../../config';
import ApiError from "../../errors/handleApiError";

const fileUploader = async (req: any) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(400, 'No file uploaded');
  }

  try {
    const fileUrl = `${config.backend_base_url}/uploads/${file.filename}`;
    const filePath = path.join(process.cwd(), 'uploads', file.filename);

    return {
      url: fileUrl,
      size: file.size,
      type: file.mimetype,
      path: filePath,
    };
  } catch (error) {
    throw new ApiError(500, 'Error processing file');
  }
};

export default fileUploader;