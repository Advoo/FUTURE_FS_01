/**
 * server.js — Stomy Portfolio Backend
 * ─────────────────────────────────────────────────────────────
 * Lightweight Express server that:
 *   1. Serves the static portfolio files (index.html, style.css, assets/)
 *   2. Exposes a /api/links endpoint that returns your contact links
 *      (keeps all real URLs in one place — edit here, not in the HTML)
 *   3. Handles a /api/contact POST endpoint for a simple message log
 *      (no DB required — logs to console; extend with nodemailer if needed)
 *
 * ─────────────────────────────────────────────────────────────
 * SETUP
 * ─────────────────────────────────────────────────────────────
 *   npm init -y
 *   npm install express cors
 *   node server.js
 *
 * For production:
 *   npm install pm2 -g
 *   pm2 start server.js --name portfolio
 *
 * ─────────────────────────────────────────────────────────────
 * ENVIRONMENT VARIABLES (optional — create a .env file)
 * ─────────────────────────────────────────────────────────────
 *   PORT=3000
 *   WHATSAPP=27XXXXXXXXX       (country code, no +)
 *   LINKEDIN=your-linkedin-slug
 *   EMAIL=you@domain.com
 *   GITHUB=your-github-username
 * ─────────────────────────────────────────────────────────────
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// ── Load .env if present (no dotenv dependency needed) ──────
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}
loadEnv();

// ── Config — EDIT THESE ───────────────────────────────────
const CONFIG = {
  port: process.env.PORT || 3000,
  whatsapp: process.env.WHATSAPP || "YOUR_WHATSAPP_NUMBER", // e.g. 27821234567
  linkedin: process.env.LINKEDIN || "YOUR_LINKEDIN_SLUG",
  email: process.env.EMAIL || "YOUR_EMAIL@domain.com",
  github: process.env.GITHUB || "YOUR_GITHUB_USERNAME",
  cv: "assets/cv.pdf", // relative path served as static
};

// ── App setup ────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (index.html, style.css, assets/)
app.use(express.static(path.join(__dirname)));

// ── API: GET /api/links ──────────────────────────────────
// Returns all contact link URLs so the frontend can stay in sync.
app.get("/api/links", (req, res) => {
  const links = {
    whatsapp: `https://wa.me/${CONFIG.whatsapp}`,
    linkedin: `https://linkedin.com/in/${CONFIG.linkedin}`,
    email: `mailto:${CONFIG.email}`,
    github: `https://github.com/${CONFIG.github}`,
    cv: `/${CONFIG.cv}`,
  };
  res.json({ success: true, links });
});

// ── API: POST /api/contact ───────────────────────────────
// Accepts { name, email, message } — logs to console.
// Extend this with nodemailer or a DB as you scale.
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields." });
  }

  // Log to console (replace with email/DB logic when ready)
  const timestamp = new Date().toISOString();
  console.log("\n──────────────────────────────");
  console.log(`📬 New message  [${timestamp}]`);
  console.log(`   From:    ${name} <${email}>`);
  console.log(`   Message: ${message}`);
  console.log("──────────────────────────────\n");

  // TODO (optional): send email with nodemailer
  // const nodemailer = require('nodemailer');
  // ... configure transporter and sendMail here

  res.json({
    success: true,
    message: "Message received. Thanks for reaching out.",
  });
});

// ── API: GET /api/ping ───────────────────────────────────
app.get("/api/ping", (req, res) => {
  res.json({ success: true, status: "online", project: "stomy-portfolio" });
});

// ── Catch-all: serve index.html for client-side nav ─────
app.get("*", (req, res) => {
  // Only serve HTML for non-asset routes
  if (!req.path.startsWith("/api") && !req.path.includes(".")) {
    res.sendFile(path.join(__dirname, "index.html"));
  } else {
    res.status(404).json({ success: false, error: "Not found." });
  }
});

// ── Start server ─────────────────────────────────────────
app.listen(CONFIG.port, () => {
  console.log("");
  console.log("  ┌─────────────────────────────────────┐");
  console.log(`  │  Stomy Portfolio                     │`);
  console.log(`  │  http://localhost:${CONFIG.port}               │`);
  console.log("  │                                     │");
  console.log(`  │  API:  /api/links                   │`);
  console.log(`  │        /api/contact  (POST)         │`);
  console.log(`  │        /api/ping                    │`);
  console.log("  └─────────────────────────────────────┘");
  console.log("");
});
