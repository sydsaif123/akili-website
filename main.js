/* ========================================
   Akili Advisory Group — Scripts
   ======================================== */

(function () {
  "use strict";

  // --- Mobile menu toggle ---
  var hamburger = document.getElementById("nav-hamburger");
  var navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // --- Populate email from config ---
  var emailEls = document.querySelectorAll("[data-email]");
  emailEls.forEach(function (el) {
    var email = CONFIG.contact_email;
    if (el.tagName === "A") {
      el.href = "mailto:" + email;
      el.textContent = email;
    } else {
      el.textContent = email;
    }
  });

  // --- Contact form ---
  var form = document.getElementById("contact-form");
  var formMessage = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formMessage.className = "form-message";
    formMessage.style.display = "none";

    var data = new FormData(form);

    fetch(CONFIG.formspree_endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          formMessage.className = "form-message success";
          formMessage.style.display = "block";
          formMessage.innerHTML =
            "Thank you. Your message has been sent — we will be in touch shortly.";
          form.reset();
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch(function () {
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
        formMessage.innerHTML =
          'Something went wrong. Please try again or email us directly at <a href="mailto:' +
          CONFIG.contact_email +
          '">' +
          CONFIG.contact_email +
          "</a>.";
      });
  });
})();
