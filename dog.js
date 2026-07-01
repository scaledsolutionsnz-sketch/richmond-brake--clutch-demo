/* ==========================================================================
   Scroll-triggered dog mascot, shared by both sites (not the chooser).
   Driven by a small per-page config object so it stays DRY:
     window.DOG_CONFIG = { img, bubble, threshold }
   ========================================================================== */
(function () {
  "use strict";
  var cfg = window.DOG_CONFIG || {};
  var img = cfg.img || "assets/img/dog.png";
  var bubble = (typeof cfg.bubble === "string") ? cfg.bubble : null;
  var fallback = cfg.threshold || 420;

  var wrap = document.createElement("div");
  wrap.className = "dog-mascot";

  var html = "";
  if (bubble) {
    html += '<div class="dog-bubble"><span>' + bubble +
            '</span><button class="dog-x" type="button" aria-label="Dismiss">&times;</button></div>';
  }
  html += '<img class="dog-img" src="' + img + '" alt="The workshop dog" width="120" height="143" loading="lazy">';
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  var dismissed = false;

  // Reveal once the reader has scrolled past the hero (fallback ~420px).
  function threshold() {
    var hero = document.querySelector(".hero");
    if (hero && hero.offsetHeight) return Math.min(hero.offsetHeight * 0.7, 620);
    return fallback;
  }
  function onScroll() {
    if (dismissed) return;
    if (window.scrollY > threshold()) wrap.classList.add("in");
    else wrap.classList.remove("in");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  var x = wrap.querySelector(".dog-x");
  if (x) {
    x.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      dismissed = true;
      wrap.classList.remove("in");
      wrap.classList.add("gone");
    });
  }
})();
