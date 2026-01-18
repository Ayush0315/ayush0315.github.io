// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("show"));
});

/* =========================
   Scroll Reveal Animations
   ========================= */

const revealEls = document.querySelectorAll(".reveal");

revealEls.forEach((el) => {
  const delay = el.getAttribute("data-delay");
  if (delay) el.style.transitionDelay = `${delay}ms`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealEls.forEach((el) => observer.observe(el));

/* =========================
   Typing Animation (Hero)
   ========================= */

const typingText = document.getElementById("typingText");

const roles = [
  "Python + SQL",
  "ETL / ELT Pipelines",
  "Data Modeling + Validation",
  "AWS + Docker",
  "Analytics Engineering",
  "Applied ML Workflows"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = deleting ? 35 : 55;
  setTimeout(typeLoop, speed);
}

typeLoop();

