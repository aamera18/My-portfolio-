import { z } from "zod";

const urlSchema = z.string().trim().url().max(500).or(z.literal(""));

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(2000),
  technologies: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
  github: urlSchema.optional().default(""),
  live: urlSchema.optional().default(""),
  published: z.boolean().default(true),
});
