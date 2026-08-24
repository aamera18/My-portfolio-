import "./Skills.css";

function Skills() {
	const skillGroups = [
		{
			icon: "</>",
			title: "Frontend",
			description: "Building responsive and user-focused interfaces.",
			skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive Design"],
		},
		{
			icon: "{ }",
			title: "Backend",
			description: "Developing APIs and server-side application logic.",
			skills: ["Node.js", "Express.js", "RESTful APIs", "CRUD Operations", "API Integration"],
		},
		{
			icon: "DB",
			title: "Database & Tools",
			description: "Working with databases and modern development tools.",
			skills: ["MongoDB", "Git", "GitHub", "Postman", "VS Code"],
		},
		{
			icon: "✦",
			title: "Core Concepts",
			description: "Applying fundamental concepts to build reliable applications.",
			skills: ["Object-Oriented Programming", "Data Structures", "Problem Solving", "Authentication", "Database Management"],
		},
	];

	return (
		<section className="skills-section" id="skills">
			<div className="skills-container">
				<div className="skills-heading">
					<p className="section-label">MY SKILLS</p>

					<h2>
						Technologies I <span>work with</span>
					</h2>

					<div className="heading-line"></div>

					<p className="skills-heading-text">
						A collection of technologies and development concepts I use to
						build modern, responsive, and functional web applications.
					</p>
				</div>

				<div className="skills-grid">
					{skillGroups.map((group) => (
						<div className="skill-card" key={group.title}>
							<div className="skill-card-header">
								<div className="skill-icon">{group.icon}</div>

								<div>
									<h3>{group.title}</h3>
									<p>{group.description}</p>
								</div>
							</div>

							<div className="skill-list">
								{group.skills.map((skill) => (
									<span className="skill-tag" key={skill}>
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="skills-summary">
					<div className="skills-summary-content">
						<div>
							<p className="summary-label">CURRENT FOCUS</p>

							<h3>
								Growing as a <span>Full-Stack Developer</span>
							</h3>
						</div>

						<p>
							Currently focused on strengthening my MERN stack development
							skills and building practical, production-oriented web
							applications.
						</p>
					</div>

					<div className="summary-stack" aria-label="MERN stack">
						<span>M</span>
						<span>E</span>
						<span>R</span>
						<span>N</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Skills;

