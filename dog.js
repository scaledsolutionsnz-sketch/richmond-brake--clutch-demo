/* ==========================================================================
   Hunter, the scroll-triggered workshop dog. Shared by both sites (not chooser).
   Per-page config:
     window.DOG_CONFIG = { img, name, bark, bubble, threshold }
   On reveal (and on click) Hunter does a little "Woof!" then says his line.
   ========================================================================== */
(function () {
  "use strict";
  var cfg = window.DOG_CONFIG || {};
  var img = cfg.img || "assets/img/dog.png";
  var name = cfg.name || "Hunter";
  var bark = cfg.bark || "Woof!";
  var line = (typeof cfg.bubble === "string") ? cfg.bubble : null;
  var message = line ? ("I'm " + name + ". " + line) : ("I'm " + name + ".");
  var fallback = cfg.threshold || 420;

  var wrap = document.createElement("div");
  wrap.className = "dog-mascot";
  wrap.innerHTML =
    '<div class="dog-bubble"><span class="dog-say">' + bark + '</span>' +
    '<button class="dog-x" type="button" aria-label="Dismiss ' + name + '">&times;</button></div>' +
    '<img class="dog-img" src="' + img + '" alt="' + name + ', the workshop dog" width="120" height="143" loading="lazy">';
  document.body.appendChild(wrap);

  var say = wrap.querySelector(".dog-say");
  var dogImg = wrap.querySelector(".dog-img");
  var dismissed = false, barkedOnce = false, seqTimer = null, reduce = false;
  try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  function barkSequence() {
    if (!say) return;
    clearTimeout(seqTimer);
    say.textContent = bark;                 // 1) Woof!
    if (!reduce) {
      dogImg.classList.remove("bark");
      void dogImg.offsetWidth;              // restart animation
      dogImg.classList.add("bark");
    }
    seqTimer = setTimeout(function () {     // 2) then say his line
      say.textContent = message;
    }, 1300);
  }

  function threshold() {
    var hero = document.querySelector(".hero");
    if (hero && hero.offsetHeight) return Math.min(hero.offsetHeight * 0.7, 620);
    return fallback;
  }
  var contact = document.querySelector("#contact");
  function onScroll() {
    if (dismissed) return;
    if (window.scrollY > threshold()) {
      if (!wrap.classList.contains("in")) {
        wrap.classList.add("in");
        if (!barkedOnce) { barkedOnce = true; setTimeout(barkSequence, 400); }
      }
    } else {
      wrap.classList.remove("in");
    }
    // Keep Hunter out of the way of the contact form / footer (dim rule only bites on mobile CSS)
    if (contact) {
      var near = contact.getBoundingClientRect().top < window.innerHeight * 0.85;
      wrap.classList.toggle("dim", near);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  // Click Hunter to make him woof again
  dogImg.addEventListener("click", function () { if (!dismissed) barkSequence(); });

  var x = wrap.querySelector(".dog-x");
  if (x) {
    x.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      dismissed = true; clearTimeout(seqTimer);
      wrap.classList.remove("in"); wrap.classList.add("gone");
    });
  }
})();
