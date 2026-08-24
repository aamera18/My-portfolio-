import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredUsername || !configuredPassword || !process.env.JWT_SECRET) {
    return res.status(503).json({ message: "Admin authentication is not configured" });
  }

  try {
    let admin = await Admin.findOne({ username });

    if (!admin && username === configuredUsername) {
      admin = await Admin.create({
        username: configuredUsername,
        password: await bcrypt.hash(configuredPassword, 12),
      });
    }

    const valid = admin && await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id.toString(), username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("portfolio_token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.json({ admin: { username: admin.username } });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};
