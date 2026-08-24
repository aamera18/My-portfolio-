
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-main">

          <div className="footer-brand">

            <a href="#home" className="footer-logo">
              AK<span>.</span>
            </a>

            <p>
              Full-Stack Developer building clean,
              responsive, and user-focused web applications.
            </p>

          </div>

          <div className="footer-links">

            <a href="#about">About</a>

            <a href="#skills">Skills</a>

            <a href="#projects">Projects</a>

            <a href="#contact">Contact</a>

          </div>

          <div className="footer-social">

            <a
              href="https://github.com/aamera18"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/aamerakarnekar1824"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>

            <a
              href="mailto:aamerakarnekar@gmail.com"
              aria-label="Email"
            >
              Email
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {currentYear} Aamera Karnekar. All rights reserved.
          </p>

          <p>
            Built with React &amp; Node.js
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
