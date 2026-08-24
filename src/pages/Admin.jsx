import { useEffect, useState } from "react";
import "./Admin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const emptyForm = { title: "", description: "", technologies: "", github: "", live: "", published: true };

function Admin() {
  const [admin, setAdmin] = useState(null);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    const response = await fetch(`${API_URL}/api/projects/admin`, { credentials: "include" });
    if (!response.ok) throw new Error("Failed to load projects");
    setProjects(await response.json());
  };

  useEffect(() => {
    fetch(`${API_URL}/api/auth/me`, { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("Not authenticated");
        return response.json();
      })
      .then(async (data) => {
        setAdmin(data.admin);
        await fetchProjects();
      })
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault(); setError("");
    const response = await fetch(`${API_URL}/api/auth/login`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: event.target.username.value, password: event.target.password.value }) });
    const data = await response.json();
    if (!response.ok) return setError(data.message || "Login failed");
    setAdmin(data.admin); await fetchProjects();
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); setSubmitting(true); setError(""); setMessage("");
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, key === "technologies" ? JSON.stringify(value.split(",").map((item) => item.trim()).filter(Boolean)) : String(value)));
    if (image) body.append("image", image);
    const response = await fetch(`${API_URL}/api/projects${editingId ? `/${editingId}` : ""}`, { method: editingId ? "PUT" : "POST", credentials: "include", body });
    const data = await response.json();
    if (!response.ok) setError(data.message || "Could not save project");
    else { setMessage(editingId ? "Project updated successfully." : "Project added successfully."); resetForm(); await fetchProjects(); }
    setSubmitting(false);
  };

  const handleEdit = (project) => {
    setEditingId(project._id); setForm({ title: project.title, description: project.description, technologies: project.technologies.join(", "), github: project.github || "", live: project.live || "", published: project.published }); setImage(null); setImagePreview(project.image || ""); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const response = await fetch(`${API_URL}/api/projects/${id}`, { method: "DELETE", credentials: "include" });
    if (response.ok) { setMessage("Project deleted successfully."); await fetchProjects(); } else setError("Could not delete project");
  };

  const resetForm = () => { setForm(emptyForm); setImage(null); setImagePreview(""); setEditingId(null); };
  const logout = async () => { await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" }); setAdmin(null); };

  if (loading) return <main className="admin-page admin-loading">Loading admin dashboard...</main>;
  if (!admin) return <main className="admin-page admin-login-page"><form className="admin-panel admin-login" onSubmit={handleLogin}><p className="admin-label">PRIVATE AREA</p><h1>Admin login</h1><label>Username<input name="username" required /></label><label>Password<input name="password" type="password" required /></label>{error && <p className="admin-error">{error}</p>}<button type="submit">Sign in</button><a href="/">Back to portfolio</a></form></main>;

  return <main className="admin-page">
    <header className="admin-header"><div><p className="admin-label">ADMIN PANEL</p><h1>Project <span>Dashboard</span></h1><p className="admin-welcome">Welcome back, {admin.username}.</p></div><div className="admin-actions"><a href="/">View portfolio</a><button className="logout-button" onClick={logout}>Logout</button></div></header>
    {message && <div className="admin-success">{message}</div>}{error && <div className="admin-error">{error}</div>}
    <section className="admin-card"><div className="admin-card-header"><div><p className="admin-label">{editingId ? "EDIT PROJECT" : "NEW PROJECT"}</p><h2>{editingId ? "Update project" : "Add a project"}</h2></div>{editingId && <button className="cancel-button" type="button" onClick={resetForm}>Cancel Edit</button>}</div>
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-field"><label htmlFor="title">Project Title</label><input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
        <div className="form-field"><label htmlFor="description">Description</label><textarea id="description" rows="6" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
        <div className="form-field"><label htmlFor="image">Project Image</label><input id="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const file = e.target.files?.[0]; setImage(file || null); if (file) setImagePreview(URL.createObjectURL(file)); }} required={!editingId} /><small>JPG, PNG or WEBP, maximum 5 MB</small></div>
        {imagePreview && <div className="image-preview"><img src={imagePreview} alt="Project preview" /></div>}
        <div className="form-field"><label htmlFor="technologies">Technologies</label><input id="technologies" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB" /></div>
        <div className="form-grid"><div className="form-field"><label htmlFor="github">GitHub URL</label><input id="github" type="url" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} /></div><div className="form-field"><label htmlFor="live">Live Demo URL</label><input id="live" type="url" value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} /></div></div>
        <label className="publish-toggle"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publish this project</label>
        <div className="form-actions"><button className="primary-button" disabled={submitting}>{submitting ? "Saving..." : editingId ? "Update Project" : "Add Project"}</button>{editingId && <button className="secondary-button" type="button" onClick={resetForm}>Cancel</button>}</div>
      </form>
    </section>
    <section className="admin-card"><div className="admin-card-header"><div><p className="admin-label">YOUR WORK</p><h2>Existing Projects</h2></div><span className="project-count">{projects.length}</span></div>{projects.length === 0 ? <p>No projects uploaded yet.</p> : <div className="admin-project-list">{projects.map((project) => <article className="admin-project" key={project._id}><div className="admin-project-image"><img src={project.image} alt={project.title} /></div><div className="admin-project-content"><span className={`status ${project.published ? "published" : "draft"}`}>{project.published ? "Published" : "Draft"}</span><h3>{project.title}</h3><p>{project.description}</p><div className="technology-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-actions"><button onClick={() => handleEdit(project)}>Edit</button><button className="delete-button" onClick={() => handleDelete(project._id)}>Delete</button></div></div></article>)}</div>}</section>
  </main>;
}

export default Admin;
