import express from "express";
import { login } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import { loginRateLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();
router.post("/login", loginRateLimiter, login);
router.get("/me", protect, (req, res) => res.json({ admin: req.admin }));
router.post("/logout", (req, res) => {
	res.clearCookie("portfolio_token", {
		httpOnly: true,
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
	});
	res.json({ message: "Logged out" });
});

export default router;
