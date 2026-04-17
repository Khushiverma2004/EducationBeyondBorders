const introLoader = document.getElementById("introLoader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
const statNumbers = document.querySelectorAll(".stat-item strong[data-count-to], .impact-num[data-count-to]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const revealTargets = document.querySelectorAll(
  ".hero__content, .hero-content, .hero-visual, .about, .story, .section-heading, .card, .pillar, .impact-card, .stat-item, .cta, .footer, .gallery-grid, .cta-inner, .gallery-item"
);

revealTargets.forEach((element) => {
  element.setAttribute("data-reveal", "");
});

window.addEventListener("load", () => {
  if (!introLoader) {
    return;
  }

  setTimeout(() => {
    introLoader.classList.add("is-hidden");
  }, 1400);
});

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
  });
});

const animateCount = (element) => {
  const target = Number(element.dataset.countTo || 0);
  const suffix = element.dataset.countSuffix || "";
  const duration = 1600;
  const startTime = performance.now();

  const updateCount = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * easedProgress);

    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  };

  requestAnimationFrame(updateCount);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.6,
  }
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealTargets.forEach((element) => observer.observe(element));
statNumbers.forEach((element) => statsObserver.observe(element));

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton?.textContent || "Submit Inquiry";

  if (formStatus) {
    formStatus.textContent = "Submitting your inquiry...";
    formStatus.classList.remove("is-success", "is-error");
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    contactForm.reset();

    if (formStatus) {
      formStatus.textContent = "Thank you! Your message has been sent successfully.";
      formStatus.classList.add("is-success");
    }
  } catch (error) {
    if (formStatus) {
      formStatus.textContent = "Sorry, your message could not be sent. Please try again.";
      formStatus.classList.add("is-error");
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
});
