import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler";
import * as httpProxy from "http-proxy";
import { IncomingMessage, ServerResponse } from "http";

const app = express();
const httpProxyAny = httpProxy as any;
const gateway = httpProxyAny.createProxyServer();

gateway.on("error", (err: Error, req: IncomingMessage, res: ServerResponse) => {
  console.error("Error occurred while proxying:", err);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("Proxy error: " + err.message);
});

// Use Helmet for security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
    hidePoweredBy: true,
    hsts: false,
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: "same-origin" },
  })
);

// CORS middleware
app.use(
  cors({
    origin: ["*", "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// Logging middleware
app.use(morgan("common"));

// Cookie parsing middleware
app.use(cookieParser());

const user = (req: IncomingMessage, res: ServerResponse) => {
  console.log("Routing to user microservice", req.url);
  try {
    gateway.web(req, res, { target: "http://localhost:5001" });
  } catch (error) {
    console.log("Error occurred while routing to user microservice", error);
  }
  console.log("Complete Routing to user microservice", req.url);
};

const product = (req: IncomingMessage, res: ServerResponse) => {
  console.log("Routing to product microservice", req.url);

  gateway.web(req, res, { target: "http://localhost:5002" });
};

app.use("/user-service", user);
app.use("/product-service", product);

// Health check endpoint
app.use("/health", (req, res) => {
  res.send("OK");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Resource not found",
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;
