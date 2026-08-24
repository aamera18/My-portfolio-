import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { createProject, deleteProject, getAllProjects, getPublicProjects, updateProject } from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";
import { apiRateLimiter } from "../middleware/rateLimiters.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "aamera-portfolio/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1600, height: 1000, crop: "limit", quality: "auto", fetch_format: "auto" }],
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return callback(new Error("Only JPG, PNG, and WEBP images are allowed"));
    }
    callback(null, true);
  },
});

router.use(apiRateLimiter);
router.get("/", getPublicProjects);
router.get("/admin", protect, getAllProjects);
router.post("/", protect, upload.single("image"), createProject);
router.put("/:id", protect, upload.single("image"), updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
