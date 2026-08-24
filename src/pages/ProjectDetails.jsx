import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, getProjectById } from "../services/projectService";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjectById(id)
      .then((data) => {
        if (!data) throw new Error("Project not found");
        setProject(data);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="project-details-page"><p>Loading project...</p></main>;
  if (error || !project) {
    return <main className="project-details-page"><div className="project-details-error"><h1>Project not found</h1><p>This project does not exist or is no longer published.</p><Link to="/">Back to Portfolio</Link></div></main>;
  }

  const imageUrl = project.image?.startsWith("/") ? `${API_URL}${project.image}` : project.image;

  return <main className="project-details-page"><div className="project-details-container">
    <Link to="/#projects" className="back-link">Back to Projects</Link>
    <div className="project-details-image"><img src={imageUrl} alt={project.title} /></div>
    <div className="project-details-content">
      <p className="section-label">PROJECT</p>
      <h1>{project.title}</h1>
      <p className="project-details-description">{project.description}</p>
      {!!project.technologies?.length && <div className="project-details-tech"><h2>Technologies</h2><div>{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>}
      <div className="project-details-links">
        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">View on GitHub</a>}
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Open Live Demo</a>}
      </div>
    </div>
  </div></main>;
}

export default ProjectDetails;
