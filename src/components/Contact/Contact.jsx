import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (
      !/^[\p{L}\p{M}\s.'-]+$/u.test(name) ||
      name.replace(/[^\p{L}]/gu, "").length < 2 ||
      name.length > 80
    ) {
      return "Please enter your real name using letters only.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
      return "Please enter a valid email address.";
    }

    if (
      subject.length < 3 ||
      subject.length > 150 ||
      !/\p{L}/u.test(subject)
    ) {
      return "Please enter a readable subject.";
    }

    if (
      message.length < 10 ||
      message.length > 3000 ||
      !/\p{L}/u.test(message) ||
      /(.)\1{7,}/u.test(message)
    ) {
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
      setStatus({
        type: "error",
        message: validationMessage,
      });
      return;
    }

    setIsSending(true);

    setStatus({
      type: "sending",
      message: "Sending your message...",
    });

    try {
      const submissionData = {
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok || data.success !== true) {
        const errorMessage =
          data.message ||
          data.error ||
          `Unable to send your message right now. (Request failed with status ${response.status})`;
        throw new Error(errorMessage);
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", {
        message: error.message,
        stack: error.stack,
      });

      let userMessage = "Unable to send your message right now.";

      if (error.message.includes("Failed to fetch")) {
        userMessage = "Network error. Please check your connection and try again.";
      } else {
        userMessage = error.message || userMessage;
      }

      setStatus({
        type: "error",
        message: userMessage,
      });
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

          {/* Contact information */}
          <div className="contact-info">
            <h3>Get in touch</h3>

            <p>
              I'm currently open to opportunities, collaborations,
              and interesting projects. Feel free to send me a message.
            </p>
          </div>

          {/* Location */}
          <div className="contact-location">
            <span className="location-icon">📍</span>

            <div>
              <strong>Based in</strong>
              <p>Panvel, Maharashtra, India</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="contact-map">
            <iframe
              title="Panvel, Maharashtra"
              src="https://www.google.com/maps?q=Panvel,Maharashtra,India&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-row">

              {/* Name */}
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
                  autoComplete="name"
                />
              </div>

              {/* Email */}
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
                  autoComplete="email"
                />
              </div>

            </div>

            {/* Subject */}
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

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                name="message"
                rows={7}
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={3000}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="contact-submit"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
              <span>→</span>
            </button>

            {/* Status */}
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