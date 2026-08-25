import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(name) || name.replace(/[^\p{L}]/gu, "").length < 2 || name.length > 80) {
      return "Please enter your real name using letters only.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) return "Please enter a valid email address.";
    if (subject.length < 3 || subject.length > 150 || !/\p{L}/u.test(subject)) return "Please enter a readable subject.";
    if (message.length < 10 || message.length > 3000 || !/\p{L}/u.test(message) || /(.)\1{7,}/u.test(message)) {
      return "Please enter a readable message between 10 and 3000 characters.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validateForm();
    if (validationMessage) {
      setStatus({ type: "error", message: validationMessage });
      return;
    }

    setIsSending(true);
    setStatus({ type: "sending", message: "Sending your message..." });

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({ type: "success", message: "Your message has been sent successfully!" });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({ type: "error", message: error.message || "Unable to send your message right now. Please try again later." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Heading */}
        <div className="contact-heading">
          <p className="section-label">CONTACT</p>

          <h2>
            Let's <span>connect</span>
          </h2>

          <div className="heading-line"></div>

          <p className="contact-subtitle">
            Have a project, opportunity, or question?
            I'd love to hear from you.
          </p>
        </div>

        {/* Contact content */}
        <div className="contact-content">

          {/* Left side */}
          <div className="contact-info">

            <h3>Get in touch</h3>

            <p>
              I'm currently open to opportunities, collaborations,
              and interesting projects. Feel free to send me a message.
            </p>
            
</div>
            <div className="contact-location">
  <span className="location-icon">📍</span>

  <div>
    <strong>Based in</strong>
    <p>Panvel, Maharashtra, India</p>
  </div>
</div>

<div className="contact-map">
  <iframe
    title="Panvel, Maharashtra"
    src="https://www.google.com/maps?q=Panvel,Maharashtra,India&output=embed"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

          {/* Form */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">Name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={80}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={120}
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What would you like to discuss?"
                value={formData.subject}
                onChange={handleChange}
                required
                maxLength={150}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={3000}
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
              <span>→</span>
            </button>

            {status.message && (
              <p
                className={`contact-status contact-status-${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            )}

          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;