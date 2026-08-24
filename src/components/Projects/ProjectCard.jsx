function ProjectCard({ project }) {
	const { title, description, image, link } = project;

	return (
		<article className="project-card">
			{image && <img src={image} alt={title} className="project-card__image" />}
			<div className="project-card__content">
				<h3>{title}</h3>
				{description && <p>{description}</p>}
				{link && (
					<a href={link} target="_blank" rel="noreferrer">
						View project
					</a>
				)}
			</div>
		</article>
	);
}

export default ProjectCard;