import express from "express";
import helmet from "helmet";
import routes from "./routes";
import { errorHandler } from "./utils/errorHandler";
import { responseFormatter } from "./utils/responseFormatter";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const app = express();

// Use Helmet for security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for APIs
    frameguard: false, // No need for frameguard in APIs
    hidePoweredBy: true, // Hide the X-Powered-By header
    hsts: false, // Disable HSTS for APIs
    xssFilter: true, // Enable XSS filter
    noSniff: true, // Prevent MIME-sniffing
    referrerPolicy: { policy: "same-origin" }, // Set Referrer-Policy header
  })
);

console.log(1);

// Middleware for parsing JSON and formatting responses
app.use(express.json());
app.use(responseFormatter);
console.log(2);

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

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service",
      version: "1.0.0",
      description: "User Service Description",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "User service",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to your route files
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use("/api", routes);

// health check
app.use("/health", (req, res) => {
  res.send("OK");
});

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Resource not found",
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;
