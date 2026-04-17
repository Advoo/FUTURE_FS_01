// server/index.js
// Backend for portfolio contact form
// Run: node server/index.js

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Optional: Use nodemailer for email
// const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// ===== MIDDLEWARE =====
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Serve built React frontend in production
app.use(express.static(path.join(__dirname, '../dist')));

// ===== CONTACT ROUTE =====
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  console.log('📬 New contact message:');
  console.log(`  From: ${name} <${email}>`);
  console.log(`  Subject: ${subject || 'No subject'}`);
  console.log(`  Message: ${message}`);

  // --- Uncomment below to enable real email sending via Nodemailer ---
  /*
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Portfolio: ${subject || 'New message'} — from ${name}`,
    html: `
      <h2>New Portfolio Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || 'None'}</p>
      <hr/>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `
  });
  */

  res.json({ success: true, message: 'Message received!' });
});

// Catch-all for React router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
