import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body ?? {};
    const fields = {
      name: typeof name === "string" ? name.trim() : "",
      email: typeof email === "string" ? email.trim().toLowerCase() : "",
      subject: typeof subject === "string" ? subject.trim() : "",
      message: typeof message === "string" ? message.trim() : "",
    };

    if (!fields.name || !fields.email || !fields.subject || !fields.message) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(fields.name) || fields.name.replace(/[^\p{L}]/gu, "").length < 2 || fields.name.length > 80) {
      return res.status(400).json({ message: "Please enter your real name using letters only." });
    }

    if (!emailPattern.test(fields.email) || fields.email.length > 120) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (fields.subject.length < 3 || fields.subject.length > 150 || !/\p{L}/u.test(fields.subject)) {
      return res.status(400).json({ message: "Please enter a readable subject." });
    }

    if (fields.message.length < 10 || fields.message.length > 3000 || !/\p{L}/u.test(fields.message) || /(.)\1{7,}/u.test(fields.message)) {
      return res.status(400).json({ message: "Please enter a readable message between 10 and 3000 characters." });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD === "YOUR_16_CHARACTER_APP_PASSWORD") {
      return res.status(503).json({ message: "Contact email service is not configured yet." });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, ""),
      },
    });

    // Send email to your Gmail
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: fields.email,
      subject: `Portfolio Contact: ${fields.subject}`,
      text: `
    Name: ${fields.name}
    Email: ${fields.email}

    Subject: ${fields.subject}

Message:
    ${fields.message}
      `,
      html: `
        <h2>New Portfolio Contact Message</h2>

        <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(fields.subject)}</p>

        <hr>

        <p><strong>Message:</strong></p>
        <p>${escapeHtml(fields.message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    next(error);
  }
};

export default sendContactMessage;