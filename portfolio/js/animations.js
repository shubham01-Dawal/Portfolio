/* ==========================================================================
   Shubham Dawal — Portfolio
   animations.js
   Handles: scroll-reveal via IntersectionObserver, hero typing animation.
   ========================================================================== */

/* ==========================================================================
   1. SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Small stagger for elements that reveal together.
          const delay = Math.min(index * 40, 240);
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   2. HERO TYPING ANIMATION
   ========================================================================== */
function initHeroTyping() {
  const el = document.getElementById("typingTitle");
  if (!el) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const titles = ["Python Developer", "Software Developer"];

  if (prefersReducedMotion) {
    el.textContent = titles.join(" | ");
    return;
  }

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const PAUSE_AFTER_TYPE = 1600;
  const PAUSE_AFTER_DELETE = 400;

  function tick() {
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentTitle.slice(0, charIndex);

      if (charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }

      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentTitle.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }

      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initHeroTyping();
});
