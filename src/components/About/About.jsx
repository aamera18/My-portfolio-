import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-heading">
          <p className="section-label">ABOUT ME</p>

          <h2>
            A little <span>about me</span>
          </h2>

          <div className="heading-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              I'm <strong>Aamera Karnekar</strong>, a Full-Stack
              Developer passionate about building responsive,
              user-focused web applications.
            </p>

            <p>
              I have a foundation in the MERN stack
              (MongoDB, Express.js, React, and Node.js), along
              with core web development skills in HTML, CSS,
              and JavaScript.
            </p>

            <p>
              Through my projects, I have worked on full-stack
              applications involving RESTful APIs, databases,
              CRUD functionality, responsive interfaces, and
              frontend development with React.
            </p>

            <p>
              I enjoy turning ideas into clean and functional
              digital experiences while continuously improving
              my development skills and understanding of modern
              web technologies.
            </p>

            <p>
              I am currently looking for an opportunity to begin
              my career as a Full-Stack Developer, particularly
              in fintech and product-focused companies.
            </p>
          </div>

          <div className="about-details">
            <div className="about-card">
              <div className="about-card-icon">&lt;/&gt;</div>

              <div>
                <h3>Full-Stack Development</h3>

                <p>
                  Building complete web applications from
                  responsive frontend interfaces to backend
                  APIs and databases.
                </p>
              </div>
            </div>

            <div className="about-card">
              <div className="about-card-icon">&lt; / &gt;</div>

              <div>
                <h3>MERN Stack</h3>

                <p>
                  Working with MongoDB, Express.js, React,
                  and Node.js to develop full-stack applications.
                </p>
              </div>
            </div>

            <div className="about-card">
              <div className="about-card-icon">✦</div>

              <div>
                <h3>Continuous Learning</h3>

                <p>
                  Continuously developing technical and
                  professional skills through projects,
                  certifications, and practical learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-info">
          <div className="about-info-item">
            <span className="about-info-label">Role</span>
            <span className="about-info-value">Full-Stack Developer</span>
          </div>

          <div className="about-info-item">
            <span className="about-info-label">Stack</span>
            <span className="about-info-value">MERN</span>
          </div>

          <div className="about-info-item">
            <span className="about-info-label">Frontend</span>
            <span className="about-info-value">React.js</span>
          </div>

          <div className="about-info-item">
            <span className="about-info-label">Backend</span>
            <span className="about-info-value">Node.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
