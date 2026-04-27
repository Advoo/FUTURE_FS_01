# FUTURE_FS_01 — Personal Portfolio Website

> **Future Interns · Full Stack Web Development Track**
> Task 1 of the FS internship program

A professional, SEO-optimised portfolio website for Stomy Mthimunye — entrepreneur, full stack developer, co-founder of Aution, and system designer building at the intersection of human experience and technology.

**Live Demo:** [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## Features

- **Editorial black, white, and warm wood aesthetic** — custom CSS, no UI framework
- **Scroll-reveal animations** — IntersectionObserver-driven entrance effects
- **Custom cursor** — animated tracking cursor with hover states
- **Hero section** — name, title, tagline, Aution co-founder badge
- **About section** — philosophy, Aution block, personality cards
- **Story Timeline** — chronological journey from university to co-founder
- **Skills with evidence** — each skill paired with *where* and *how* it was used
- **Projects showcase** — CRM, Business Site, Portfolio, AI OS prototype
- **Photography section** — Stomy Photography at UWC
- **Soft skills** — leadership, communication, execution
- **CV download** — PDF resume link
- **Contact form** — with Node.js + Express backend + optional Nodemailer
- **SEO structure** — semantic HTML, meta tags, accessible markup
- **Fully responsive** — mobile nav, stacked layouts

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5 / CSS3 / Vanilla JS (or React + Vite) |
| Fonts | Playfair Display + DM Sans + DM Mono |
| Backend | Node.js + Express |
| Email | Nodemailer (optional) |
| Deploy | Vercel (frontend) + Railway (backend) |

---

## Project Structure

```
FUTURE_FS_01/
├── index.html          # Complete portfolio (single file, works standalone)
├── server.js           # Node.js contact form backend
├── .env.example        # Environment variable template
├── package.json        # Backend dependencies
├── vercel.json         # Vercel routing config
└── README.md           # This file
```

---

## Setup

### Option A — Open Directly (Static, no backend)
Just open `index.html` in a browser. The contact form will show a success message in demo mode.

### Option B — With Backend (Email enabled)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/FUTURE_FS_01.git
cd FUTURE_FS_01

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Fill in EMAIL_USER and EMAIL_PASS

# 4. Run the server
node server.js
# Server runs on http://localhost:3001
```

### Option C — Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts — select the project folder
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3001
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-vercel-url.vercel.app
```

> Use a Gmail App Password (not your regular password). Enable 2FA on your Google account, then create an App Password under Security settings.

---

## Customisation Guide

### Update Personal Info
All personal data lives in `index.html`. Search for:
- `Stomy Mthimunye` — replace with your name
- `yourusername` — replace GitHub username
- `stomy@email.com` — replace email
- `@stomyphotography` — replace Instagram

### Add Photos (Photography Section)
Replace the `.photo-placeholder` divs in the photography section with actual `<img>` tags:
```html
<img src="./assets/photo-1.jpg" alt="Description" class="photo-item"/>
```

### Add/Edit Skills
Each skill is a `.skill-card` block. Edit the `--skill-width` CSS variable (percentage) and the description text.

### Add Projects
Copy a `.project-card` block and update the content, GitHub links, and live demo URL.

### Update CV
Replace the `href="#"` on the CV download link with the path to your PDF:
```html
<a href="./assets/stomy-cv-2025.pdf" class="cv-download">
```

---

## GitHub Repo Naming (Future Interns)

Per internship guidelines:
- Track code: **FS**
- Task 1 repository: **`FUTURE_FS_01`**

---

## License

MIT — free to fork, adapt, and use as a template.

---

*Built with intent. Every section treated as a real client deliverable.*
