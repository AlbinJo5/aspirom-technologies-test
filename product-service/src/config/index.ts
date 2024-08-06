import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5002;
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/aspiron-technologies-product";
export const NODE_ENV = process.env.NODE_ENV || "development";
