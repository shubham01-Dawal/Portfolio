# Shubham Dawal — Portfolio

A static, responsive personal portfolio website built with plain HTML5, CSS3
and vanilla JavaScript. No frameworks, no backend, no database — designed to
be hosted for free on GitHub Pages.

## Overview

This site presents Shubham Dawal's education, technical skills, internship
experience and projects to recruiters, HR professionals and internship
providers. All content is sourced from the resume; placeholders are used for
links that were not supplied (LinkedIn, GitHub, project demo URLs).

## Technologies Used

- **HTML5** — semantic markup (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — custom properties (design tokens), Flexbox/Grid, glassmorphism, responsive breakpoints
- **Vanilla JavaScript** — mobile navigation, smooth scroll, scroll-reveal animations, form validation
- **[serve](https://www.npmjs.com/package/serve)** (dev dependency only) — for running the site locally

No React, Vite, Next.js, Angular, Vue, or backend/database is used.

## Folder Structure

```
Portfolio/
│
├── assets/
│   ├── images/          # Any images you add (profile photo, OG image, etc.)
│   ├── icons/            # favicon.svg
│   └── resume/
│       └── resume.pdf    # Downloadable resume
│
├── css/
│   ├── style.css         # Design tokens + main styles
│   └── responsive.css    # Responsive breakpoints
│
├── js/
│   ├── script.js         # Config, nav, scroll-to-top, form validation
│   └── animations.js     # Scroll-reveal + hero typing animation
│
├── index.html
├── package.json
├── package-lock.json     # generated locally by `npm install`
└── README.md
```

`node_modules/` is intentionally not included — it's generated locally and
should not be committed to GitHub.

## How to Run Locally

1. Install [Node.js](https://nodejs.org/) (only needed to run a local static
   server — the site itself has no dependencies).
2. From the `Portfolio/` folder, install dependencies:

   ```bash
   npm install
   ```

3. Start a local server:

   ```bash
   npm start
   ```

4. Open the printed local URL (typically `http://localhost:3000`) in your browser.

You can also just open `index.html` directly in a browser, but running a
local server is recommended so relative paths and fonts behave exactly as
they will on GitHub Pages.

## How to Customize

Most personal details live in one place: the `portfolioData` object at the
top of **`js/script.js`**:

```js
const portfolioData = {
  name: "Shubham Dawal",
  email: "shubhamdawal01@gmail.com",
  phone: "+91 8767085008",
  location: "Virar East, Maharashtra",
  linkedin: "ADD_LINKEDIN_URL",
  github: "ADD_GITHUB_URL",
  projects: {
    scanNDine: { github: "...", demo: "..." },
    cafeManagementSystem: { github: "...", demo: "..." }
  },
  formEndpoint: ""
};
```

### Update your LinkedIn URL
Replace `"ADD_LINKEDIN_URL"` with your full profile URL, e.g.
`"https://www.linkedin.com/in/your-handle"`. This automatically updates every
LinkedIn link across the navbar, hero, contact section and footer.

### Update your GitHub URL
Replace `"ADD_GITHUB_URL"` the same way — it updates every GitHub link on the site.

### Update project links
Fill in the `github` and `demo` values inside `projects.scanNDine` and
`projects.cafeManagementSystem` with your real repository and live-demo URLs.

### Update or replace your resume
Replace the file at `assets/resume/resume.pdf` with your own PDF, keeping the
same filename. The "Download Resume" buttons in the navbar and hero section
already point to `assets/resume/resume.pdf`, so no other changes are needed.
(A resume PDF generated from the same content used across the site is
included as a starting point — swap in your official file at any time.)

### Connect the contact form to a real inbox
The contact form works out of the box using a `mailto:` link (it opens the
visitor's email client with the message pre-filled) — no backend needed on
GitHub Pages. If you'd like messages submitted directly instead:

1. Create a free form endpoint with [Formspree](https://formspree.io/) or
   [Web3Forms](https://web3forms.com/).
2. Paste the endpoint URL into `formEndpoint` in `js/script.js`.
3. The form will then POST submissions to that service automatically.

### Add a profile photo or Open Graph image
Add your image to `assets/images/`, then reference it where needed (e.g.
uncomment and update the `og:image` meta tag in `index.html`).

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this project to it (do not push `node_modules/`).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the branch (e.g. `main`) and the `/ (root)` folder, then save.
5. Your site will be published at:

   ```
   https://USERNAME.github.io/REPOSITORY-NAME/
   ```

All CSS, JavaScript, image and resume paths in this project are relative, so
the site works correctly whether it's hosted at the root of a domain or in a
subpath like the one above.

## License

MIT — feel free to adapt this template for your own portfolio.
