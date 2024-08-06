import { Request } from "express";
import { NODE_ENV } from "../config";
import fs from "fs";
import path from "path";

export const logError = async (
  error: any,
  req: Request,
  location: string = ""
) => {
  const errorDetails = {
    message: error.message || "An error occurred",
    stack: error.stack || "",
    resolved: false,
    stage: NODE_ENV || "unknown",
    api: `${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl || req.url
    }`,
    location: location,
    body: req.body ?? {},
  };

  // Log error details to the console in development mode
  if (NODE_ENV === "development") {
    console.error("Error:", error);
    console.error("Error Message:", errorDetails.message);
    console.error("Stack Trace:", errorDetails.stack);
  }

  // Ensure the 'logs' directory exists
  const logDir = path.join(__dirname, "..", "logs");
  if (!fs.existsSync(logDir)) {
    try {
      fs.mkdirSync(logDir, { recursive: true });
    } catch (mkdirError) {
      console.error("Failed to create logs directory:", mkdirError);
      return; // Exit if directory creation fails
    }
  }

  // Define the file path for logging
  const filePath = path.join(
    logDir,
    `${new Date().toISOString().split("T")[0]}.log`
  );
  const log = `${new Date().toISOString()} - ${JSON.stringify(errorDetails)}\n`;

  // Attempt to write the log entry to the file
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, log, "utf8");
    } else {
      fs.appendFileSync(filePath, log, "utf8");
    }
  } catch (fileError) {
    console.error("Failed to write to log file:", fileError);
  }
};
