import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    description: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
      image: { type: String, required: true, trim: true },
      imagePublicId: { type: String, default: "", trim: true },
    technologies: { type: [String], default: [] },
    github: { type: String, default: "", trim: true },
    live: { type: String, default: "", trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
