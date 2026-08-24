import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.cookies?.portfolio_token;

  if (!token || !process.env.JWT_SECRET) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protect;
