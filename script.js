// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

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

/* =========================
   Crazy Animation:
   Cursor Glow + Parallax Blobs
   ========================= */

const cursorGlow = document.getElementById("cursorGlow");
const blobs = document.querySelectorAll(".blob");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // show glow once user moves mouse
  cursorGlow.style.opacity = "1";
});

function animateGlow() {
  cursorGlow.style.left = `${mouseX}px`;
  cursorGlow.style.top = `${mouseY}px`;
  requestAnimationFrame(animateGlow);
}

animateGlow();

// Parallax blob movement
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;

  blobs.forEach((blob) => {
    const power = Number(blob.getAttribute("data-parallax")) || 12;
    blob.style.transform = `translate(${x * power}px, ${y * power}px)`;
  });
});

