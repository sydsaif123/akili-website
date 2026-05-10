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

})();
