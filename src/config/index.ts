import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.bcrypt_salt_round,

  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  authorized:{
    authorize_api_login_id: process.env.AUTHORIZE_API_LOGIN_ID,
    authorize_transaction_key: process.env.AUTHORIZE_TRANSACTION_KEY,
  },
  backend_base_url: process.env.BACKEND_BASE_URL,
};
