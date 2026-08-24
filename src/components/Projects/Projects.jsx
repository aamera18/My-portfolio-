import "./Projects.css";

const projects = [
  {
    number: "01",
    title: "Smart Portfolio Tracker",
    category: "Finance · Full Stack",
    description:
      "A MERN-based investment portfolio tracking application designed around portfolio and holdings management.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/aamera18",
    demo: "#",
    visual: "PORTFOLIO",
    accent: "TRACKER",
  },
  {
    number: "02",
    title: "Expense Tracker",
    category: "Productivity · Full Stack",
    description:
      "A full-stack expense management application for recording, categorizing, filtering and reviewing personal expenses.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/aamera18",
    demo: "#",
    visual: "EXPENSE",
    accent: "TRACKER",
  },
  {
    number: "03",
    title: "Personal Portfolio",
    category: "Frontend · Personal",
    description:
      "A responsive personal portfolio designed to showcase projects, technical skills, certifications and development experience.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/aamera18",
    demo: "#",
    visual: "PERSONAL",
    accent: "PORTFOLIO",
  },
];

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Heading */}
        <div className="projects-heading">
          <p className="projects-label">PROJECTS</p>

          <h2>
            Selected <span>work</span>
          </h2>

          <div className="projects-heading-line"></div>

          <p className="projects-intro">
            A few projects I've built while developing my
            full-stack skills.
          </p>
        </div>

        {/* Projects */}
        <div className="projects-list">
          {projects.map((project, index) => (
            <article
              className={`project-item ${
                index % 2 !== 0 ? "project-reverse" : ""
              }`}
              key={project.number}
            >

              {/* Temporary Visual */}
              <div className="project-visual">
                <div className="project-visual-inner">

                  {project.number === "01" ? (
                    <div className="finance-preview" aria-label="Finance tracker dashboard preview">
                      <aside className="finance-sidebar">
                        <div className="finance-brand"><span>F</span><strong>folio</strong></div>
                        <div className="finance-nav finance-nav-active"><span>◈</span>Overview</div>
                        <div className="finance-nav"><span>↗</span>Investments</div>
                        <div className="finance-nav"><span>▣</span>Transactions</div>
                        <div className="finance-nav"><span>⚙</span>Settings</div>
                        <div className="finance-sidebar-footer"><span className="finance-avatar">AM</span><span>My account</span></div>
                      </aside>
                      <div className="finance-main">
                        <div className="finance-topbar"><div><span className="finance-kicker">MONDAY, 24 JUNE</span><strong>Good morning, Aamera</strong></div><span className="finance-bell">♢</span></div>
                        <div className="finance-balance"><span>Total balance</span><strong>$24,680<span>.42</span></strong><small><b>↗ 12.8%</b> this month</small></div>
                        <div className="finance-stats"><div><span>Income</span><strong>$8,420</strong><b>↗ 8.4%</b></div><div><span>Spending</span><strong>$3,160</strong><b className="finance-down">↘ 2.1%</b></div></div>
                        <div className="finance-chart"><div className="finance-chart-heading"><strong>Balance overview</strong><span>6 months⌄</span></div><div className="finance-bars"><i style={{ height: "35%" }}></i><i style={{ height: "48%" }}></i><i style={{ height: "42%" }}></i><i style={{ height: "68%" }}></i><i style={{ height: "58%" }}></i><i className="finance-bar-current" style={{ height: "86%" }}></i></div><div className="finance-months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div></div>
                        <div className="finance-transactions"><div className="finance-chart-heading"><strong>Recent transactions</strong><span>View all</span></div><div><span className="finance-transaction-icon finance-icon-grocery">⌁</span><span>Grocery market<small>Today, 10:24 AM</small></span><b>-$84.20</b></div><div><span className="finance-transaction-icon finance-icon-salary">↗</span><span>Salary deposit<small>Yesterday, 09:00 AM</small></span><b className="finance-income">+$4,200</b></div></div>
                      </div>
                    </div>
                  ) : project.number === "02" ? (
                    <div className="expense-preview" aria-label="Expense tracker dashboard preview">
                      <div className="expense-header"><div className="expense-brand"><span>◒</span><strong>spendly</strong></div><span className="expense-profile">AM</span></div>
                      <div className="expense-welcome"><span>YOUR OVERVIEW</span><strong>Good afternoon, Aamera</strong><button>+ Add expense</button></div>
                      <div className="expense-summary"><div><span>Total spent this month</span><strong>$1,284.60</strong><small><b>↓ 8.2%</b> vs last month</small></div><div className="expense-budget"><span>Monthly budget</span><strong>$2,000</strong><div className="expense-progress"><i></i></div><small>$715.40 remaining</small></div></div>
                      <div className="expense-content"><div className="expense-breakdown"><div className="expense-section-title"><strong>Spending breakdown</strong><span>This month⌄</span></div><div className="expense-donut"><div><strong>65%</strong><span>Essentials</span></div></div><div className="expense-legend"><span><i className="expense-dot expense-dot-one"></i>Food <b>$420</b></span><span><i className="expense-dot expense-dot-two"></i>Transport <b>$218</b></span><span><i className="expense-dot expense-dot-three"></i>Shopping <b>$178</b></span></div></div><div className="expense-list"><div className="expense-section-title"><strong>Recent expenses</strong><span>View all</span></div><div><span className="expense-icon">⌁</span><span>Whole Foods<small>Food · Today</small></span><b>-$84.20</b></div><div><span className="expense-icon expense-icon-orange">▣</span><span>Uber ride<small>Transport · Yesterday</small></span><b>-$24.50</b></div><div><span className="expense-icon expense-icon-yellow">✦</span><span>New sneakers<small>Shopping · 20 Jun</small></span><b>-$96.00</b></div></div></div>
                    </div>
                  ) : (
                    <>
                      <div className="portfolio-laptop" aria-label="Personal portfolio laptop preview">
                        <div className="portfolio-laptop-screen">
                          <div className="portfolio-browser-bar"><span></span><span></span><span></span><em>portfolio.aamera.dev</em></div>
                          <div className="portfolio-browser-content">
                            <div className="portfolio-mini-nav"><strong><b>&lt;</b>AAMERA<b>/&gt;</b></strong><span className="portfolio-mini-nav-active">Home</span><span>About</span><span>Projects</span><button>Resume <b>↗</b></button></div>
                            <div className="portfolio-mini-hero">
                              <div><small>HELLO, I'M</small><strong>Aamera<br /><i>Karnekar</i></strong><b>Full-Stack Developer</b><p>Building clean, functional, and scalable digital experiences.</p><div className="portfolio-mini-actions"><button>View work <b>↗</b></button><span><i></i>Available for work</span></div></div>
                              <div className="portfolio-mini-code"><span>● ● ● <em>developer.js</em></span><code><b>const</b> developer = &#123;<br />&nbsp;&nbsp;name: <i>"Aamera"</i>,<br />&nbsp;&nbsp;role: <i>"Full-Stack Developer"</i>,<br />&nbsp;&nbsp;stack: [<br />&nbsp;&nbsp;&nbsp;&nbsp;<em>"React"</em>,<br />&nbsp;&nbsp;&nbsp;&nbsp;<em>"Node.js"</em>,<br />&nbsp;&nbsp;&nbsp;&nbsp;<em>"MongoDB"</em><br />&nbsp;&nbsp;]<br />&#125;</code></div>
                            </div>
                          </div>
                        </div>
                        <div className="portfolio-laptop-base"><span></span></div>
                      </div>
                    </>
                  )}

                </div>
              </div>

              {/* Project Information */}
              <div className="project-details">

                <span className="project-number">
                  {project.number}
                </span>

                <p className="project-category">
                  {project.category}
                </p>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="project-links">

                  <a
                    href={project.demo}
                    className="project-link project-demo"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (project.demo === "#") {
                        e.preventDefault();
                      }
                    }}
                  >
                    View Project
                    <span>↗</span>
                  </a>

                  <a
                    href={project.github}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                    <span>↗</span>
                  </a>

                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Temporary Notice */}
        <div className="projects-note">
          <span>Currently refining these projects.</span>
          <span>More details coming soon.</span>
        </div>

      </div>
    </section>
  );
}

export default Projects;