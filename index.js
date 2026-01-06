/* =========================================================
   ANIME FOLLOW MOUSE
========================================================= */
const anime = document.getElementById("anime");

if (anime) {
  document.addEventListener("mousemove", (e) => {
    const rect = anime.getBoundingClientRect();
    const animeX = rect.left + rect.width / 2;
    const animeY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - animeY, e.clientX - animeX);
    const degrees = angle * (180 / Math.PI);
    anime.style.transform = `rotate(${degrees}deg)`;
  });
}

/* =========================================================
   SPLASH SCREEN
========================================================= */
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  if (!splash) return;

  setTimeout(() => {
    splash.classList.add("hidden");
  }, 4500);
});

/* =========================================================
   ABOUT CARD AUTO SWITCH
========================================================= */
const cards = document.querySelectorAll(".developer-cards .card");
let currentIndex = 0;

function switchActiveCard() {
  if (!cards.length) return;

  cards.forEach(card => card.classList.remove("active"));
  currentIndex = (currentIndex + 1) % cards.length;
  cards[currentIndex].classList.add("active");
}

if (cards.length) {
  setInterval(switchActiveCard, 3000);
}

/* =========================================================
   INTERSECTION OBSERVER (GENERAL)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = [
    ...document.querySelectorAll(".section-title h2, .section-title .subtitle"),
    document.querySelector(".about-text"),
    document.querySelector(".about-image"),
    document.querySelector(".developer-cards"),
    ...document.querySelectorAll(".project-card"),
    ...document.querySelectorAll(".skill-box")
  ].filter(Boolean);

  if (!elementsToObserve.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementsToObserve.forEach(el => observer.observe(el));
});

/* =========================================================
   FORCE ABOUT VISIBLE (ON LOAD)
========================================================= */
window.addEventListener("load", () => {
  document.querySelector(".about-text")?.classList.add("visible");
  document.querySelector(".about-image")?.classList.add("visible");
  document.querySelector(".section-title h2")?.classList.add("visible");
  document.querySelector(".section-title .subtitle")?.classList.add("visible");
});

/* =========================================================
   PROJECTS ANIMATION
========================================================= */
const projectCards = document.querySelectorAll(".project-card");

if (projectCards.length) {
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        projectObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  projectCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.8s ease";
    projectObserver.observe(card);
  });
}

/* =========================================================
   NAVBAR ACTIVE ON SCROLL
========================================================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

if (sections.length && navLinks.length) {
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* =========================================================
   SKILL CARD CLICK ANIMATION
========================================================= */
const skillBoxes = document.querySelectorAll(".skill-box");

skillBoxes.forEach(box => {
  box.addEventListener("click", () => {
    skillBoxes.forEach(item => {
      if (item !== box) item.classList.remove("active");
    });
    box.classList.toggle("active");
  });
});

/* =========================================================
   CONTACT SEND MESSAGE NOTIFICATION
========================================================= */
const contactForm = document.querySelector(".contact-form");
const sendNotification = document.getElementById("sendNotification");

if (contactForm && sendNotification) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop reload

    sendNotification.classList.add("show");
    contactForm.reset();

    setTimeout(() => {
      sendNotification.classList.remove("show");
    }, 3000);
  });
}
