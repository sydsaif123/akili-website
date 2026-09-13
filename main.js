/* ========================================
   Akili Advisory Group — Scripts
   ======================================== */

(function () {
  "use strict";

  // --- Preloader: pulse centre, then fly into the nav logo slot ---
  // Runs first and is fully self-contained so nothing else on the page
  // can stop the overlay from being removed.
  (function () {
    var pre = document.getElementById("preloader");
    if (!pre) return;

    var flyLogo = document.getElementById("preloader-logo");
    var navImg = document.querySelector(".nav-logo img");

    var revealed = false;
    function reveal() {
      if (revealed) return;
      revealed = true;
      document.body.classList.remove("preloading");
      if (pre.parentNode) pre.parentNode.removeChild(pre);
    }

    // Hard safety FIRST: whatever happens below, never leave the site covered.
    setTimeout(reveal, 4000);

    try {
      var reduce = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !flyLogo || !navImg) {
        reveal();
        return;
      }

      var fly = function () {
        try {
          // Neutralise the pulse so we measure the logo's natural size.
          flyLogo.style.animation = "none";
          flyLogo.style.transform = "none";
          var src = flyLogo.getBoundingClientRect();
          var dst = navImg.getBoundingClientRect();
          var scale = src.width ? dst.width / src.width : 0.4;
          var dx = (dst.left + dst.width / 2) - (src.left + src.width / 2);
          var dy = (dst.top + dst.height / 2) - (src.top + src.height / 2);

          // Force reflow so the transition runs from the natural state.
          flyLogo.getBoundingClientRect();
          flyLogo.style.transition =
            "transform 0.75s cubic-bezier(0.6, 0.05, 0.2, 0.95)";
          flyLogo.style.transform =
            "translate(" + dx + "px," + dy + "px) scale(" + scale + ")";
          pre.classList.add("done");

          flyLogo.addEventListener("transitionend", reveal, { once: true });
          setTimeout(reveal, 1000); // fallback if transitionend never fires
        } catch (e) {
          reveal();
        }
      };

      setTimeout(fly, 900); // ~1s of pulsing, then fly
    } catch (e) {
      reveal();
    }
  })();

  // --- Mobile menu toggle ---
  var hamburger = document.getElementById("nav-hamburger");
  var navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
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
  }

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
