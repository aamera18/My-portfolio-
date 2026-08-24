import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <p className="hero-greeting">
            Hello, I'm
          </p>

          <h1>
            Aamera <span>Karnekar</span>
          </h1>

          <h2>
            Full-Stack Developer
          </h2>

          <p className="hero-description">
            I build responsive and user-focused web applications
            using modern frontend and backend technologies.
            I enjoy turning ideas into clean, functional,
            and scalable digital experiences.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">

            <a
              href="#projects"
              className="hero-primary-button"
            >
              View My Projects
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-secondary-button"
            >
              View Resume
            </a>

          </div>

          {/* Social Links */}
          <div className="hero-socials">

            <a
              href="https://github.com/aamera18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.71c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.07 1.53 1.07.9 1.58 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 7.13c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v1.4c0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/aamerakarnekar1824"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.3 9.6h3.8v10.9H3.3V9.6Zm6.2 0h3.6v1.49h.05c.5-.95 1.72-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.76v5.6h-3.8v-4.97c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.64v5.05H9.5V9.6Z" />
              </svg>
            </a>

            <a
              href="mailto:aamerakarnekar@gmail.com"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M3.5 5.5h17A1.5 1.5 0 0 1 22 7v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 17V7a1.5 1.5 0 0 1 1.5-1.5Zm0 2.1v.18l8.5 5.48 8.5-5.48V7.6h-17Zm17 1.95-7.69 4.96a1.5 1.5 0 0 1-1.62 0L3.5 9.55V17h17V9.55Z" />
              </svg>
            </a>

          </div>

        </div>

        {/* Right Visual */}
        <div className="hero-visual">

          <div className="hero-card">

            <div className="hero-card-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="hero-code">

              <p>
                <span className="code-purple">const</span>{" "}
                developer = {"{"}
              </p>

              <p>
                &nbsp;&nbsp;name:{" "}
                <span className="code-orange">
                  "Aamera"
                </span>,
              </p>

              <p>
                &nbsp;&nbsp;role:{" "}
                <span className="code-orange">
                  "Full-Stack Developer"
                </span>,
              </p>

              <p>
                &nbsp;&nbsp;stack: [
              </p>

              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-green">
                  "React"
                </span>,
              </p>

              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-green">
                  "Node.js"
                </span>,
              </p>

              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-green">
                  "MongoDB"
                </span>
              </p>

              <p>
                &nbsp;&nbsp;]
              </p>

              <p>{"}"}</p>

              <p className="code-cursor">
                _
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="hero-scroll"
        aria-label="Scroll to About section"
      >
        <span></span>
        Scroll to explore
      </a>

    </section>
  );
}

export default Hero;