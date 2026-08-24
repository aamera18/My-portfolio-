import Project from "../models/Project.js";
import { projectSchema } from "../validators/projectValidator.js";
import cloudinary from "../config/cloudinary.js";
import isValidObjectId from "../utils/isValidObjectId.js";

const parseTechnologies = (value) => {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value || "[]");
  } catch {
    return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
  }
};

const parseData = (body, current = {}) => ({
  title: body.title ?? current.title,
  description: body.description ?? current.description,
  technologies: body.technologies === undefined
    ? current.technologies || []
    : parseTechnologies(body.technologies),
  github: body.github ?? current.github ?? "",
  live: body.live ?? current.live ?? "",
  published: body.published === undefined
    ? current.published ?? true
    : body.published === "true",
});

export const getPublicProjects = async (req, res) => {
  try {
    res.json(await Project.find({ published: true }).sort({ createdAt: -1 }).lean());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    res.json(await Project.find().sort({ createdAt: -1 }).lean());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

export const createProject = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Project image is required" });

  try {
    const validation = projectSchema.safeParse(parseData(req.body));
    if (!validation.success) {
      if (req.file.public_id) await cloudinary.uploader.destroy(req.file.public_id);
      return res.status(400).json({ message: "Invalid project data", errors: validation.error.flatten() });
    }
    const project = await Project.create({ ...validation.data, image: req.file.path, imagePublicId: req.file.public_id || "" });
    res.status(201).json(project);
  } catch (error) {
    if (req.file.public_id) await cloudinary.uploader.destroy(req.file.public_id);
    res.status(400).json({ message: error.message || "Failed to create project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid project ID" });
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const validation = projectSchema.safeParse(parseData(req.body, project));
    if (!validation.success) {
      if (req.file?.public_id) await cloudinary.uploader.destroy(req.file.public_id);
      return res.status(400).json({ message: "Invalid project data", errors: validation.error.flatten() });
    }

    const oldImagePublicId = project.imagePublicId;
    Object.assign(project, validation.data);
    if (req.file) {
      project.image = req.file.path;
      project.imagePublicId = req.file.public_id || "";
    }
    await project.save();

    if (req.file && oldImagePublicId) {
      await cloudinary.uploader.destroy(oldImagePublicId);
    }
    res.json(project);
  } catch (error) {
    if (req.file?.public_id) await cloudinary.uploader.destroy(req.file.public_id);
    res.status(400).json({ message: error.message || "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid project ID" });
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.imagePublicId) await cloudinary.uploader.destroy(project.imagePublicId);
    res.json({ message: "Project deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete project" });
  }
};
