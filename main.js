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

  // --- Scroll progress hairline + condensed nav ---
  (function () {
    var bar = document.getElementById("scroll-progress");
    var nav = document.querySelector(".nav");
    if (!bar && !nav) return;

    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = (doc.scrollHeight - window.innerHeight) || 1;
      var y = window.pageYOffset || doc.scrollTop || 0;

      if (bar) {
        var pct = Math.min(1, Math.max(0, y / max));
        bar.style.transform = "scaleX(" + pct + ")";
      }
      if (nav) {
        nav.classList.toggle("condensed", y > 24);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  })();

  // --- Scroll reveal ---
  // Content is visible by default. The hidden state is only armed once we
  // know we can un-hide it, so a JS or observer failure never blanks the page.
  (function () {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) return;

    document.body.classList.add("js-reveal");

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });

    // Safety: never leave anything hidden.
    setTimeout(function () {
      items.forEach(function (el) { el.classList.add("revealed"); });
    }, 4000);
  })();

  // --- Auto-rotating slides ---
  // The markup shows every slide stacked by default. We only switch to the
  // one-at-a-time presentation once the script is running, so a failure here
  // leaves the content readable rather than hidden.
  (function () {
    var root = document.getElementById("about-slides");
    if (!root) return;

    var slides = [].slice.call(root.querySelectorAll(".slide"));
    var dots = [].slice.call(root.querySelectorAll(".slide-dot"));
    if (slides.length < 2 || dots.length !== slides.length) return;

    var DWELL = 6000;
    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.add("js-slides");
    root.style.setProperty("--dwell", DWELL + "ms");

    var current = 0;
    var timer = null;

    function render(next) {
      current = (next + slides.length) % slides.length;
      slides.forEach(function (el, i) {
        el.classList.toggle("is-active", i === current);
        el.setAttribute("aria-hidden", i === current ? "false" : "true");
      });
      dots.forEach(function (d, i) {
        d.setAttribute("aria-current", i === current ? "true" : "false");
        d.classList.toggle("is-done", i < current);
        // restart the fill animation on the live segment
        if (i === current) {
          var bar = d.querySelector(".slide-bar");
          if (bar) { bar.style.animation = "none"; bar.offsetHeight; bar.style.animation = ""; }
        }
      });
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    function start() {
      if (reduce) return;
      stop();
      timer = setInterval(function () { render(current + 1); }, DWELL);
    }

    function goTo(i) {
      render(i);
      start();
    }

    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { goTo(i); });
      d.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); dots[(current) % dots.length].focus(); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(current - 1); dots[(current) % dots.length].focus(); }
      });
    });

    // pause while the reader is on it
    function pause() { root.classList.add("is-paused"); stop(); }
    function resume() { root.classList.remove("is-paused"); start(); }
    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", resume);

    // and while the tab is in the background
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    render(0);
    start();
  })();

})();
