import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5001;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/aspirom-technologies-users";
