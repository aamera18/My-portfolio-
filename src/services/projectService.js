const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-api-66o3.onrender.com";

export const getPublicProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) throw new Error("Failed to load projects");
  return response.json();
};

export const getProjectById = async (id) => {
  const projects = await getPublicProjects();
  return projects.find((project) => project._id === id);
};

export { API_URL };
