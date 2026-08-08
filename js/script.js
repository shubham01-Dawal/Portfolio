/* ==========================================================================
   Shubham Dawal — Portfolio
   script.js
   Handles: configuration, mobile menu, smooth scroll, active nav state,
            scroll-to-top, contact form validation.
   ========================================================================== */

/* ==========================================================================
   1. EASY-EDIT CONFIGURATION
   Update the values below to personalize the site. Nothing else in this
   file needs to change.
   ========================================================================== */
const portfolioData = {
  name: "Shubham Dawal",
  email: "shubhamdawal01@gmail.com",
  phone: "+91 8767085008",
  location: "Virar East, Maharashtra",

  // Replace with your real profile URLs
  linkedin: "https://www.linkedin.com/in/shubham-dawal-416914420/",
  github: "https://github.com/shubham01-Dawal",

  // Real project links
  projects: {
    scanNDine: {
      github: "https://github.com/shubham01-Dawal/Scan-N-Dine",
      demo: "#"
    },
    cafeManagementSystem: {
      github: "https://github.com/shubham01-Dawal/Cafe-Management-System",
      demo: "#"
    }
  },

  // Optional: connect a form service such as Formspree or Web3Forms.
  // Leave empty to fall back to opening the visitor's email client (mailto).
  formEndpoint: ""
};

/* ==========================================================================
   2. APPLY CONFIGURATION TO THE PAGE
   ========================================================================== */
function applyPortfolioData() {
  const linkTargets = [
    "linkedinLink",
    "contactLinkedin",
    "footerLinkedin"
  ];
  const githubTargets = [
    "githubLink",
    "contactGithub",
    "footerGithub"
  ];

  linkTargets.forEach((id) => {
    const el = document.getElementById(id);
    if (el && portfolioData.linkedin && portfolioData.linkedin !== "ADD_LINKEDIN_URL") {
      el.href = portfolioData.linkedin;
    }
  });

  githubTargets.forEach((id) => {
    const el = document.getElementById(id);
    if (el && portfolioData.github && portfolioData.github !== "ADD_GITHUB_URL") {
      el.href = portfolioData.github;
    }
  });

  const project1Github = document.getElementById("project1Github");
  const project1Demo = document.getElementById("project1Demo");
  const project2Github = document.getElementById("project2Github");
  const project2Demo = document.getElementById("project2Demo");

  if (project1Github) project1Github.href = portfolioData.projects.scanNDine.github;
  if (project1Demo) project1Demo.href = portfolioData.projects.scanNDine.demo;
  if (project2Github) project2Github.href = portfolioData.projects.cafeManagementSystem.github;
  if (project2Demo) project2Demo.href = portfolioData.projects.cafeManagementSystem.demo;
}

/* ==========================================================================
   3. MOBILE NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  }

  hamburger.addEventListener("click", toggleMenu);

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ==========================================================================
   4. NAVBAR SCROLL STATE + ACTIVE LINK ON SCROLL
   ========================================================================== */
function initNavbarScrollState() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   5. SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollTopButton() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  function toggleVisibility() {
    btn.classList.toggle("visible", window.scrollY > 480);
  }

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   6. CONTACT FORM VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: { el: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { el: document.getElementById("email"), error: document.getElementById("emailError") },
    subject: { el: document.getElementById("subject"), error: document.getElementById("subjectError") },
    message: { el: document.getElementById("message"), error: document.getElementById("messageError") }
  };

  const formNote = document.getElementById("formNote");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    field.el.closest(".form-group").classList.toggle("has-error", Boolean(message));
    field.error.textContent = message || "";
  }

  function validateField(key) {
    const field = fields[key];
    const value = field.el.value.trim();

    if (!value) {
      setError(field, "This field is required.");
      return false;
    }

    if (key === "email" && !emailPattern.test(value)) {
      setError(field, "Please enter a valid email address.");
      return false;
    }

    if (key === "message" && value.length < 10) {
      setError(field, "Please add a little more detail (10+ characters).");
      return false;
    }

    setError(field, "");
    return true;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("blur", () => validateField(key));
    fields[key].el.addEventListener("input", () => {
      if (fields[key].el.closest(".form-group").classList.contains("has-error")) {
        validateField(key);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const allValid = Object.keys(fields)
      .map((key) => validateField(key))
      .every(Boolean);

    if (!allValid) {
      formNote.textContent = "Please fix the highlighted fields.";
      formNote.style.color = "var(--danger)";
      return;
    }

    const { name, email, subject, message } = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      subject: fields.subject.el.value.trim(),
      message: fields.message.el.value.trim()
    };

    if (portfolioData.formEndpoint) {
      // A form service (e.g. Formspree, Web3Forms) has been connected.
      fetch(portfolioData.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      })
        .then((res) => {
          if (res.ok) {
            formNote.textContent = "Thanks! Your message has been sent.";
            formNote.style.color = "var(--primary-light)";
            form.reset();
          } else {
            throw new Error("Form service error");
          }
        })
        .catch(() => {
          formNote.textContent = "Something went wrong. Please try again later.";
          formNote.style.color = "var(--danger)";
        });
    } else {
      // No backend on GitHub Pages: fall back to opening the visitor's
      // email client with the message pre-filled.
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
      const mailSubject = encodeURIComponent(subject);
      window.location.href = `mailto:${portfolioData.email}?subject=${mailSubject}&body=${body}`;

      formNote.textContent = "Opening your email client to send the message...";
      formNote.style.color = "var(--primary-light)";
      form.reset();
    }
  });
}

/* ==========================================================================
   7. FOOTER YEAR
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  applyPortfolioData();
  initMobileMenu();
  initNavbarScrollState();
  initActiveNavOnScroll();
  initScrollTopButton();
  initContactForm();
  initFooterYear();
});
