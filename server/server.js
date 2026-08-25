import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 5000;

await connectDB();

app.disable("x-powered-by");
app.use(cors({
	origin: process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173",
	credentials: true,
}));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cookieParser());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use((req, res, next) => {
	["body", "params", "headers"].forEach((key) => {
		if (req[key]) req[key] = mongoSanitize.sanitize(req[key]);
	});
	next();
});
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.get("/", (req, res) => res.json({ message: "Portfolio API is running" }));
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
