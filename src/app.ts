import express from "express";
import swaggerUi from "swagger-ui-express";

import fs from "fs";
import path from "path";
import { RegisterRoutes } from "./routes/v1/routes";
import { globalError } from "./middlewares/globalErrorHandler";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();

// ========================
// Global Middleware
// ========================
app.use(express.json()); // Help to get the json from request body
console.log(" world")
// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(globalError)

// ========================
// ERROR Handler
// ========================
// Handle Later

export default app;
