import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">

        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          <span>&lt;</span>
          AAMERA
          <span>/&gt;</span>
        </a>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>

          <a href="#contact" onClick={closeMenu}>Contact</a>

          <a
            href="/resume.pdf"
            className="resume-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;