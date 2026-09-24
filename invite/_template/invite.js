/**
 * invite.js — Shared invitation logic
 * ─────────────────────────────────────────────────────────────
 * Loaded after invitation-data.js on every invite page.
 * Reads `weddingData` and drives all rendering, interactivity
 * and animations. Never edit this file per-invite — put all
 * couple-specific content in invitation-data.js instead.
 */

(function () {
  "use strict";

  /* =========================================================
     SCROLL REVEAL
     Defined first so the render pass can call observeReveal()
     after injecting dynamic sections.
  ========================================================= */

  var _prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  function observeRevealElements() {
    if (_prefersReduced) {
      document
        .querySelectorAll(".reveal")
        .forEach(function (el) {
          el.classList.add("visible");
        });
      return;
    }
    document
      .querySelectorAll(".reveal:not(.visible)")
      .forEach(function (el) {
        revealObserver.observe(el);
      });
  }

  /* =========================================================
     RENDER FROM DATA
  ========================================================= */

  (function render() {
    var d = weddingData;

    function qs(sel) {
      return document.querySelector(sel);
    }
    function qsa(sel) {
      return document.querySelectorAll(sel);
    }
    function set(sel, html) {
      var el = qs(sel);
      if (el) el.innerHTML = html;
    }

    /* ── Page title & meta ─────────────────── */
    document.title = d.bride.name + " & " + d.groom.name + " | Wedding";
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content =
        "Join " +
        d.bride.name +
        " and " +
        d.groom.name +
        " as they begin their journey together.";
    }

    /* ── Opening screen ────────────────────── */
    set(".opening-small", d.taglines.opening);
    var openingNames = document.querySelectorAll("#opening .opening-names");
    if (openingNames[0]) openingNames[0].textContent = d.bride.displayTitle;
    if (openingNames[1]) openingNames[1].textContent = d.groom.displayTitle;
    set(".opening-date", d.weddingDate.display);

    /* ── Hero ──────────────────────────────── */
    set(".hero-small", d.taglines.hero);
    var heroNames = qsa(".hero-names");
    if (heroNames[0]) heroNames[0].textContent = d.bride.name;
    if (heroNames[1]) heroNames[1].textContent = d.groom.name;
    set(".hero-date", d.weddingDate.display);

    /* ── Couple section ────────────────────── */
    set(".section-text.couple-intro", d.taglines.coupleIntro);
    var persons = qsa(".person");
    var coupleData = [d.bride, d.groom];
    var roles = ["The Bride", "The Groom"];
    persons.forEach(function (el, i) {
      var c = coupleData[i];
      if (!c) return;
      var img = el.querySelector(".person-photo");
      var name = el.querySelector(".person-name");
      var role = el.querySelector(".person-role");
      if (img) {
        img.src = c.photo;
        img.alt = c.name;
      }
      if (name) name.textContent = c.name;
      if (role) role.textContent = roles[i];
    });

    /* ── Story section ─────────────────────── */
    var storyTitle = document.querySelector(".story .section-title");
    var storyText = document.querySelector(".story .section-text");
    if (storyTitle) storyTitle.textContent = d.taglines.storyTitle;
    if (storyText)
      storyText.innerHTML = d.taglines.storyBody.replace(/\n\n/g, "<br><br>");

    /* ── Events ────────────────────────────── */
    var eventSections = document.getElementById("eventSections");
    if (eventSections) {
      eventSections.innerHTML = d.events
        .map(function (ev, i) {
          var dark = i % 2 !== 0;
          return (
            '<section class="event-section' +
            (dark ? " event-section--dark" : "") +
            '" aria-label="' +
            ev.title +
            '">' +
            '<div class="section-inner">' +
            '<div class="eyebrow reveal">Wedding Celebrations</div>' +
            '<div class="event-section-icon reveal">' +
            ev.icon +
            "</div>" +
            '<h2 class="section-title reveal">' +
            ev.title +
            "</h2>" +
            '<div class="event-section-meta reveal">' +
            ev.date +
            " &nbsp;·&nbsp; " +
            ev.time +
            "</div>" +
            '<p class="section-text reveal">' +
            ev.description +
            "</p>" +
            '<div class="event-section-venue reveal">' +
            '<div class="event-section-venue-name">' +
            ev.venue.name +
            "</div>" +
            '<div class="event-section-venue-address">' +
            ev.venue.address +
            "</div>" +
            '<a class="event-section-directions" href="' +
            ev.venue.mapsUrl +
            '" target="_blank" rel="noopener">Get Directions</a>' +
            "</div>" +
            "</div>" +
            "</section>"
          );
        })
        .join("");
      observeRevealElements();
    }

    /* ── Gallery ───────────────────────────── */
    var galleryGrid = document.querySelector(".gallery-grid");
    if (galleryGrid) {
      galleryGrid.innerHTML = d.gallery
        .map(function (img) {
          return (
            '<div class="gallery-item' +
            (img.large ? " large" : "") +
            ' reveal">' +
            '<img src="' +
            img.src +
            '" alt="' +
            d.bride.name +
            " and " +
            d.groom.name +
            '">' +
            "</div>"
          );
        })
        .join("");
    }

    /* ── Footer ────────────────────────────── */
    set(".footer-names", d.bride.name + " & " + d.groom.name);
    set(".footer-text", d.taglines.footerLine);

    /* ── Music source ──────────────────────── */
    if (d.music && d.music.src) {
      var audio = document.getElementById("weddingMusic");
      if (audio) {
        audio.src = d.music.src;
        audio.load();
      }
    }
  })();

  /* =========================================================
     OPEN INVITATION
  ========================================================= */

  var opening = document.getElementById("opening");
  var openButton = document.getElementById("openInvitation");

  openButton.addEventListener("click", function () {
    opening.classList.add("hidden");
    document.body.style.overflow = "auto";
    startMusic();
  });

  /* =========================================================
     MUSIC
  ========================================================= */

  var music = document.getElementById("weddingMusic");
  var musicButton = document.getElementById("musicButton");
  var musicPlaying = false;

  function startMusic() {
    if (!music.src || music.src === window.location.href) return;
    music
      .play()
      .then(function () {
        musicPlaying = true;
        musicButton.textContent = "♫";
      })
      .catch(function () {});
  }

  musicButton.addEventListener("click", function () {
    if (!music.src || music.src === window.location.href) return;
    if (musicPlaying) {
      music.pause();
      musicPlaying = false;
      musicButton.textContent = "♪";
    } else {
      music.play();
      musicPlaying = true;
      musicButton.textContent = "♫";
    }
  });

  /* =========================================================
     SCROLL REVEAL — initial pass after page load
  ========================================================= */

  observeRevealElements();

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  (function initCountdown() {
    var grid = document.getElementById("countdownGrid");
    if (!grid) return;

    var weddingDay = weddingData.weddingDate.iso;
    var weddingTime = weddingData.weddingDate.countdownTime || "19:00:00";
    var target = new Date(weddingDay + "T" + weddingTime);

    function pad(n) {
      return String(Math.max(0, n)).padStart(2, "0");
    }

    function buildGrid(days, hours, minutes, seconds) {
      return (
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-days">' +
        pad(days) +
        "</span>" +
        '<span class="countdown-label">Days</span>' +
        "</div>" +
        '<span class="countdown-separator" aria-hidden="true">:</span>' +
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-hours">' +
        pad(hours) +
        "</span>" +
        '<span class="countdown-label">Hours</span>' +
        "</div>" +
        '<span class="countdown-separator" aria-hidden="true">:</span>' +
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-mins">' +
        pad(minutes) +
        "</span>" +
        '<span class="countdown-label">Minutes</span>' +
        "</div>" +
        '<span class="countdown-separator" aria-hidden="true">:</span>' +
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-secs">' +
        pad(seconds) +
        "</span>" +
        '<span class="countdown-label">Seconds</span>' +
        "</div>"
      );
    }

    function tick() {
      var now = Date.now();
      var diff = target - now;

      if (diff <= 0) {
        grid.innerHTML = '<p class="countdown-done">Today is the day! 💍</p>';
        return;
      }

      var totalSecs = Math.floor(diff / 1000);
      var secs = totalSecs % 60;
      var totalMins = Math.floor(totalSecs / 60);
      var mins = totalMins % 60;
      var totalHrs = Math.floor(totalMins / 60);
      var hrs = totalHrs % 24;
      var days = Math.floor(totalHrs / 24);

      var cdDays = document.getElementById("cd-days");
      if (!cdDays) {
        grid.innerHTML = buildGrid(days, hrs, mins, secs);
        return;
      }

      var cdHours = document.getElementById("cd-hours");
      var cdMins = document.getElementById("cd-mins");
      var cdSecs = document.getElementById("cd-secs");

      if (cdDays.textContent !== pad(days)) cdDays.textContent = pad(days);
      if (cdHours.textContent !== pad(hrs)) cdHours.textContent = pad(hrs);
      if (cdMins.textContent !== pad(mins)) cdMins.textContent = pad(mins);
      if (cdSecs.textContent !== pad(secs)) cdSecs.textContent = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
  })();

  /* =========================================================
     PREVENT SCROLL WHILE OPENING SCREEN IS ACTIVE
  ========================================================= */

  document.body.style.overflow = "hidden";
})();
