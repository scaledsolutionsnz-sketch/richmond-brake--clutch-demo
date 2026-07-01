/* ==========================================================================
   Hunter, the scroll-triggered workshop dog. Shared by both sites (not chooser).
   Per-page config:
     window.DOG_CONFIG = { img, name, bark, bubble, threshold, woof }
     - woof: (optional) URL of a real bark sound, e.g. "assets/woof.mp3".
       If not set, a short "woof" is synthesized with the Web Audio API.
   On reveal Hunter does a silent "Woof!" bounce; CLICKING him plays a woof sound too.
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

  /* --- Woof sound (real file if provided, otherwise synthesized) --- */
  var realWoof = cfg.woof ? new Audio(cfg.woof) : null;
  if (realWoof) realWoof.preload = "auto";
  var actx = null;
  function synthWoof() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      actx = actx || new AC();
      if (actx.state === "suspended") actx.resume();
      var t = actx.currentTime;
      // tonal body: pitch glides down (the "woo"), lowpass warms it up
      var osc = actx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(430, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.18);
      var lp = actx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(1700, t);
      lp.frequency.exponentialRampToValueAtTime(650, t + 0.2);
      var g = actx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
      osc.connect(lp); lp.connect(g); g.connect(actx.destination);
      osc.start(t); osc.stop(t + 0.26);
      // noise transient: the "ff" at the end
      var nb = actx.createBufferSource();
      var buf = actx.createBuffer(1, Math.floor(actx.sampleRate * 0.08), actx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      nb.buffer = buf;
      var hp = actx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 900;
      var ng = actx.createGain();
      ng.gain.setValueAtTime(0.22, t + 0.02);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      nb.connect(hp); hp.connect(ng); ng.connect(actx.destination);
      nb.start(t + 0.02); nb.stop(t + 0.12);
    } catch (e) { /* audio not available, stay silent */ }
  }
  function playWoof() {
    if (realWoof) {
      try {
        realWoof.currentTime = 0;
        var p = realWoof.play();
        if (p && p.catch) p.catch(function () { synthWoof(); });
        return;
      } catch (e) { /* fall through to synth */ }
    }
    synthWoof();
  }

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

  // Click Hunter to make him woof (sound + bounce)
  dogImg.addEventListener("click", function () {
    if (dismissed) return;
    playWoof();
    barkSequence();
  });

  var x = wrap.querySelector(".dog-x");
  if (x) {
    x.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      dismissed = true; clearTimeout(seqTimer);
      wrap.classList.remove("in"); wrap.classList.add("gone");
    });
  }
})();
