/**
 * royal-invite.js — Mitali & Karan Royal Edition
 * ─────────────────────────────────────────────────────────────
 * Standalone JS for the royal invitation page.
 * Reads `royalInvitation` from invitation-data.js.
 * Reads sprite atlas via RoyalSprite from royal-sprite.js.
 *
 * Responsibilities:
 *   - Sprite rendering (all decorations via atlas)
 *   - Gallery rendering
 *   - Countdown timer
 *   - Opening screen
 *   - Music toggle
 *   - Navigation menu
 *   - Scroll reveal (IntersectionObserver)
 *   - Parallax on hero background
 *   - Animations
 */

(function () {
  "use strict";

  var d = royalInvitation;

  /* =========================================================
     HELPERS
  ========================================================= */

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return document.querySelectorAll(sel); }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  var isMobile = window.innerWidth <= 767;

  /* =========================================================
     PREVENT SCROLL WHILE OPENING SCREEN IS ACTIVE
  ========================================================= */

  document.body.style.overflow = "hidden";

  /* =========================================================
     SPRITE RENDERING
     ─────────────────────────────────────────────────────────
     All decorative assets are rendered from the sprite atlas.
     Sizes follow the placement intent from the design spec.
     Do NOT add individual <img> tags for decorations.
  ========================================================= */

  (function renderSprites() {

    /*
     * Definition format:
     *   sprite     — key in atlas JSON
     *   className  — CSS class on the target <div> in HTML
     *   width      — desktop target width in px
     *   mobileWidth — mobile target width in px (omit to hide via CSS)
     *
     * The atlas is never displayed at full size.
     * getCSSProps() calculates background-size and background-position
     * from the JSON coordinates for each sprite.
     */

    var defs = [

      /* ── OPENING ─────────────────────────────────────── */
      {
        sprite:      "floral-top-left",
        className:   "mkr-opening-floral--tl",
        width:        220,
        mobileWidth:  130
      },
      {
        sprite:      "floral-top-right",
        className:   "mkr-opening-floral--tr",
        width:        220,
        mobileWidth:  130
      },
      {
        sprite:      "floral-branch-left",
        className:   "mkr-opening-floral--bl",
        width:        160,
        mobileWidth:  90
      },
      {
        sprite:      "floral-branch-right",
        className:   "mkr-opening-floral--br",
        width:        160,
        mobileWidth:  90
      },
      {
        sprite:      "lanterns",
        className:   "mkr-opening-lanterns",
        width:        280,
        mobileWidth:  160
      },

      /* ── HERO ────────────────────────────────────────── */
      {
        sprite:      "arch-frame",
        className:   "mkr-hero-arch",
        width:        960,
        mobileWidth:  380
      },
      {
        sprite:      "chhatri-left",
        className:   "mkr-hero-chhatri--left",
        width:        120,
        mobileWidth:  0      /* hidden via CSS on mobile */
      },
      {
        sprite:      "chhatri-right",
        className:   "mkr-hero-chhatri--right",
        width:        120,
        mobileWidth:  0
      },
      {
        sprite:      "floral-top-left",
        className:   "mkr-hero-floral--tl",
        width:        300,
        mobileWidth:  140
      },
      {
        sprite:      "floral-top-right",
        className:   "mkr-hero-floral--tr",
        width:        300,
        mobileWidth:  140
      },
      {
        sprite:      "lanterns",
        className:   "mkr-hero-lanterns",
        width:        300,
        mobileWidth:  160
      },
      {
        sprite:      "peacock-left",
        className:   "mkr-hero-peacock",
        width:        280,
        mobileWidth:  140
      },
      {
        sprite:      "floral-left-cascade",
        className:   "mkr-hero-fg-left",
        width:        260,
        mobileWidth:  120
      },
      {
        sprite:      "floral-right-cascade",
        className:   "mkr-hero-fg-right",
        width:        260,
        mobileWidth:  120
      },

      /* ── COUPLE ──────────────────────────────────────── */
      {
        sprite:      "peacock-right",
        className:   "mkr-couple-peacock",
        width:        180,
        mobileWidth:  90
      },
      {
        sprite:      "floral-left-cascade",
        className:   "mkr-couple-floral-left",
        width:        200,
        mobileWidth:  100
      },
      {
        sprite:      "floral-right-cascade",
        className:   "mkr-couple-floral-right",
        width:        200,
        mobileWidth:  100
      },
    /* ── Photo frame: sized relative to the actual rendered portrait.
       We read the first portrait frame's width after layout and apply
       that + 24px (inset compensation) to all frame sprites.          */
    var firstPortrait = qs(".mkr-portrait-frame");
    if (firstPortrait) {
      var portraitW = firstPortrait.offsetWidth || (isMobile ? 194 : 260);
      var frameW    = portraitW + 24;
      qsa(".mkr-portrait-frame-sprite").forEach(function (el) {
        RoyalSprite.applyToElement(el, "photo-frame", frameW);
        /* Ensure the sprite fills the inset area regardless of JS timing */
        el.style.position = "absolute";
        el.style.inset    = "-12px";
        el.style.width    = "calc(100% + 24px)";
        el.style.height   = "auto";
      });
    }
      {
        sprite:      "floral-branch-left",
        className:   "mkr-portrait-floral-tl",
        width:        64,
        mobileWidth:  56
      },
      {
        sprite:      "floral-branch-right",
        className:   "mkr-portrait-floral-tr",
        width:        64,
        mobileWidth:  56
      },

      /* ── STORY ───────────────────────────────────────── */
      {
        sprite:      "floral-branch-left",
        className:   "mkr-story-floral-left",
        width:        160,
        mobileWidth:  80
      },
      {
        sprite:      "floral-branch-right",
        className:   "mkr-story-floral-right",
        width:        160,
        mobileWidth:  80
      },
      {
        sprite:      "peacock-right",
        className:   "mkr-story-peacock",
        width:        290,
        mobileWidth:  150
      },

      /* ── MEMORIES ────────────────────────────────────── */
      {
        sprite:      "floral-top-left",
        className:   "mkr-memories-floral-tl",
        width:        240,
        mobileWidth:  110
      },
      {
        sprite:      "floral-top-right",
        className:   "mkr-memories-floral-br",
        width:        240,
        mobileWidth:  110
      },
      {
        sprite:      "chhatri-left",
        className:   "mkr-memories-chhatri-left",
        width:        80,
        mobileWidth:  0
      },
      {
        sprite:      "chhatri-right",
        className:   "mkr-memories-chhatri-right",
        width:        80,
        mobileWidth:  0
      },

      /* ── COUNTDOWN ───────────────────────────────────── */
      {
        sprite:      "lanterns",
        className:   "mkr-countdown-lanterns",
        width:        320,
        mobileWidth:  160
      },
      {
        sprite:      "floral-branch-left",
        className:   "mkr-countdown-floral-tl",
        width:        160,
        mobileWidth:  80
      },
      {
        sprite:      "floral-branch-right",
        className:   "mkr-countdown-floral-tr",
        width:        160,
        mobileWidth:  80
      },

      /* ── FOOTER ──────────────────────────────────────── */
      {
        sprite:      "floral-top-left",
        className:   "mkr-footer-floral-tl",
        width:        220,
        mobileWidth:  110
      },
      {
        sprite:      "floral-top-right",
        className:   "mkr-footer-floral-tr",
        width:        220,
        mobileWidth:  110
      },
      {
        sprite:      "floral-branch-left",
        className:   "mkr-footer-floral-bl",
        width:        140,
        mobileWidth:  80
      },
      {
        sprite:      "floral-branch-right",
        className:   "mkr-footer-floral-br",
        width:        140,
        mobileWidth:  80
      },
      {
        sprite:      "lanterns",
        className:   "mkr-footer-lanterns",
        width:        220,
        mobileWidth:  120
      }
    ];

    /* Render every definition using the RoyalSprite helper */
    RoyalSprite.renderAll(defs);

    /* ── Photo frame: sized relative to actual portrait width ── */
    /* Run after first paint so offsetWidth is available          */
    requestAnimationFrame(function () {
      var firstPortrait = qs(".mkr-portrait-frame");
      if (firstPortrait) {
        var portraitW = firstPortrait.offsetWidth || (isMobile ? 194 : 260);
        var frameW    = portraitW + 24;
        qsa(".mkr-portrait-frame-sprite").forEach(function (el) {
          RoyalSprite.applyToElement(el, "photo-frame", frameW);
          el.style.position = "absolute";
          el.style.inset    = "-12px";
          /* Override width/height set by JS — fill the inset area fluidly */
          el.style.width    = "calc(100% + 24px)";
          el.style.height   = "calc(100% + 24px)";
        });
      }
    });

    /* ── Ornament-small dividers (shared class) ────────── */
    var ornamentWidth = isMobile ? 36 : 44;
    qsa(".mkr-ornament-img--sprite").forEach(function (el) {
      RoyalSprite.applyToElement(el, "ornament-small", ornamentWidth);
      el.style.flexShrink = "0";
    });

    /* ── Ornament-center in opening screen ─────────────── */
    var openOrnEl = qs(".mkr-opening-ornament");
    if (openOrnEl) {
      RoyalSprite.applyToElement(openOrnEl, "ornament-center", isMobile ? 52 : 64);
      openOrnEl.style.margin = "0 auto 24px";
    }

    /* ── Ornament-center in countdown ───────────────────── */
    var cdOrnEl = qs(".mkr-countdown-ornament");
    if (cdOrnEl) {
      RoyalSprite.applyToElement(cdOrnEl, "ornament-center", isMobile ? 52 : 64);
      cdOrnEl.style.margin = "24px auto 40px";
    }

    /* ── Ornament-center in footer ───────────────────────── */
    var ftOrnEl = qs(".mkr-footer-ornament");
    if (ftOrnEl) {
      RoyalSprite.applyToElement(ftOrnEl, "ornament-center", isMobile ? 48 : 60);
      ftOrnEl.style.margin = "0 auto 30px";
    }

    /* ── Hero ornament divider line ──────────────────────── */
    var heroOrnEl = qs(".mkr-hero-ornament-line");
    if (heroOrnEl) {
      RoyalSprite.applyToElement(heroOrnEl, "ornament-small", 44);
      heroOrnEl.style.margin = "0 auto";
    }

    /* ── Story divider ornament ──────────────────────────── */
    var storyDiv = qs(".mkr-story-divider");
    if (storyDiv) {
      RoyalSprite.applyToElement(storyDiv, "ornament-center", isMobile ? 52 : 64);
      storyDiv.style.margin = "28px auto";
    }

    /* ── Memories bottom ornament ───────────────────────── */
    var memOrnEl = qs(".mkr-memories-ornament");
    if (memOrnEl) {
      RoyalSprite.applyToElement(memOrnEl, "ornament-small", 48);
      memOrnEl.style.margin = "52px auto 0";
    }

    /* ── Hero & story background: palace-lake sprite ──────
       Rendered as a full-width atmospheric strip.
       Uses window.innerWidth for reliable sizing at script time.
       The sprite is repeated horizontally to fill the section.  */
    requestAnimationFrame(function () {
      var palaceBgEls = qsa(".mkr-hero-palace-bg, .mkr-story-bg-sprite");
      palaceBgEls.forEach(function (el) {
        var targetW = Math.max(window.innerWidth, 800);
        var sp = RoyalSprite.getCSSProps("palace-lake", targetW);
        if (sp) {
          el.style.backgroundImage    = sp.backgroundImage;
          el.style.backgroundRepeat   = "repeat-x";
          el.style.backgroundSize     = sp.backgroundSize;
          /* Pin to bottom; Y position from the atlas calculation */
          el.style.backgroundPosition = "0 " + sp.backgroundPosition.split(" ")[1];
        }
      });
    });

    /* ── Hero silhouette: palace-silhouette sprite ─────── */
    var silhouetteEls = qsa(".mkr-hero-silhouette, .mkr-story-silhouette, .mkr-countdown-silhouette, .mkr-footer-silhouette");
    silhouetteEls.forEach(function (el) {
      var w = Math.max(window.innerWidth * 1.1, 700);
      RoyalSprite.applyToElement(el, "palace-silhouette", w);
      /* Override width to span full viewport */
      el.style.width = "max(110vw, 700px)";
      el.style.maxWidth = "none";
    });

    /* ── Couple centre ornament ─────────────────────────── */
    var centreOrnEl = qs(".mkr-couple-centre-ornament");
    if (centreOrnEl) {
      RoyalSprite.applyToElement(centreOrnEl, "ornament-center", 56);
      centreOrnEl.style.flexShrink = "0";
    }

  })();

  /* =========================================================
     GALLERY
  ========================================================= */

  (function renderGallery() {
    var grid = document.getElementById("mkrGalleryGrid");
    if (!grid || !d.gallery || !d.gallery.length) return;

    grid.innerHTML = d.gallery.map(function (item, i) {
      var isLarge = !!item.large;
      var cls = "mkr-gallery-item mkr-reveal" + (isLarge ? " mkr-gallery-item--large" : "");
      var alt = "Mitali and Karan — wedding photo " + (i + 1);
      return (
        '<div class="' + cls + '" role="listitem">' +
        '<img src="' + item.src + '" alt="' + alt + '" loading="lazy">' +
        '</div>'
      );
    }).join("");
  })();

  /* =========================================================
     MUSIC
  ========================================================= */

  var music     = document.getElementById("mkrMusic");
  var musicBtn  = document.getElementById("mkrMusicBtn");
  var musicPlaying = false;

  if (d.music && d.music.src && music) {
    music.src = d.music.src;
    music.load();
  }

  function startMusic() {
    if (!music || !music.src || music.src === window.location.href) return;
    music.play()
      .then(function () {
        musicPlaying = true;
        if (musicBtn) musicBtn.textContent = "♫";
      })
      .catch(function () { /* Autoplay blocked — silent fail */ });
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", function () {
      if (!music || !music.src || music.src === window.location.href) return;
      if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        musicBtn.textContent = "♪";
      } else {
        music.play()
          .then(function () {
            musicPlaying = true;
            musicBtn.textContent = "♫";
          })
          .catch(function () {});
      }
    });
  }

  /* =========================================================
     OPENING SCREEN
  ========================================================= */

  var opening = document.getElementById("mkrOpening");
  var openBtn = document.getElementById("mkrOpenBtn");

  if (openBtn && opening) {
    openBtn.addEventListener("click", function () {
      opening.classList.add("mkr-opening--hidden");
      setTimeout(function () {
        document.body.style.overflow = "";
      }, 1200);
      startMusic();
    });
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  var navToggle = document.getElementById("mkrNavToggle");
  var navMenu   = document.getElementById("mkrNavMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = !navMenu.hidden;
      navMenu.hidden = isOpen;
      navToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.hidden = true;
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (!navMenu.hidden && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.hidden = true;
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  function initReveal() {
    if (prefersReducedMotion()) {
      qsa(".mkr-reveal").forEach(function (el) {
        el.classList.add("mkr-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("mkr-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    qsa(".mkr-reveal:not(.mkr-visible)").forEach(function (el) {
      observer.observe(el);
    });
  }

  initReveal();

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  (function initCountdown() {
    var grid = document.getElementById("mkrCountdownGrid");
    if (!grid) return;

    var weddingDay  = d.weddingDate.iso;
    var weddingTime = d.weddingDate.countdownTime || "20:00:00";
    var target      = new Date(weddingDay + "T" + weddingTime);

    function pad(n) {
      return String(Math.max(0, n)).padStart(2, "0");
    }

    function buildGrid(days, hrs, mins, secs) {
      return [
        unit("mkr-cd-days",  pad(days),  "Days"),
        sep(),
        unit("mkr-cd-hours", pad(hrs),   "Hours"),
        sep(),
        unit("mkr-cd-mins",  pad(mins),  "Minutes"),
        sep(),
        unit("mkr-cd-secs",  pad(secs),  "Seconds"),
      ].join("");
    }

    function unit(id, val, label) {
      return (
        '<div class="mkr-cd-unit">' +
        '<span class="mkr-cd-number" id="' + id + '">' + val + '</span>' +
        '<span class="mkr-cd-label">' + label + '</span>' +
        '</div>'
      );
    }

    function sep() {
      return '<span class="mkr-cd-separator" aria-hidden="true">:</span>';
    }

    function tick() {
      var diff = target - Date.now();

      if (diff <= 0) {
        grid.innerHTML = '<p class="mkr-countdown-done">Today is the day!</p>';
        return;
      }

      var totalSecs = Math.floor(diff / 1000);
      var secs      = totalSecs % 60;
      var totalMins = Math.floor(totalSecs / 60);
      var mins      = totalMins % 60;
      var totalHrs  = Math.floor(totalMins / 60);
      var hrs       = totalHrs % 24;
      var days      = Math.floor(totalHrs / 24);

      var daysEl = document.getElementById("mkr-cd-days");
      if (!daysEl) {
        grid.innerHTML = buildGrid(days, hrs, mins, secs);
        grid.classList.add("mkr-visible");
        return;
      }

      var hrsEl  = document.getElementById("mkr-cd-hours");
      var minsEl = document.getElementById("mkr-cd-mins");
      var secsEl = document.getElementById("mkr-cd-secs");

      if (daysEl.textContent  !== pad(days))  daysEl.textContent  = pad(days);
      if (hrsEl.textContent   !== pad(hrs))   hrsEl.textContent   = pad(hrs);
      if (minsEl.textContent  !== pad(mins))  minsEl.textContent  = pad(mins);
      if (secsEl.textContent  !== pad(secs))  secsEl.textContent  = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
  })();

  /* =========================================================
     PARALLAX — subtle palace background movement on scroll
     Only on desktop, respects reduced motion.
  ========================================================= */

  (function initParallax() {
    if (prefersReducedMotion()) return;
    if (window.innerWidth < 768) return;

    var palaceBg   = qs(".mkr-hero-palace-bg");
    var silhouette = qs(".mkr-hero-silhouette");
    if (!palaceBg && !silhouette) return;

    var ticking = false;

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var scrollY = window.scrollY;
        var heroH   = qs(".mkr-hero") ? qs(".mkr-hero").offsetHeight : window.innerHeight;

        if (scrollY < heroH) {
          var ratio = scrollY / heroH;
          if (palaceBg)   palaceBg.style.transform   = "translateY(" + (ratio * 30) + "px)";
          if (silhouette) silhouette.style.transform  = "translateX(-50%) translateY(" + (ratio * -15) + "px)";
        }

        ticking = false;
      });
    }, { passive: true });
  })();

  /* =========================================================
     ANALYTICS — page view (if GA available)
  ========================================================= */

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_title:    "Mitali & Karan — Royal Wedding Invitation",
      page_location: window.location.href,
    });
  }

})();
