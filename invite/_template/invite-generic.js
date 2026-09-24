/**
 * invite-generic.js — Shared invitation logic for non-wedding events
 * ─────────────────────────────────────────────────────────────────────
 * Loaded after invitation-data.js on every generic invite page.
 * Reads `eventData` and drives all rendering, interactivity and
 * animations. Never edit this file per-invite — put all event-specific
 * content in invitation-data.js instead.
 *
 * Supports: baby shower, birthday, engagement, anniversary,
 *           housewarming, party, celebration — and anything else.
 */

(function () {
  "use strict";

  /* =========================================================
     SCROLL REVEAL
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
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }
    document.querySelectorAll(".reveal:not(.visible)").forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* =========================================================
     RENDER FROM DATA
  ========================================================= */

  (function render() {
    var d = eventData;

    function qs(sel) { return document.querySelector(sel); }
    function qsa(sel) { return document.querySelectorAll(sel); }
    function set(sel, html) {
      var el = qs(sel);
      if (el) el.innerHTML = html;
    }

    /* ── Page title & meta ─────────────────────────────── */
    document.title = d.title + " | InviteWalla";
    var metaDesc = qs('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content =
        "You're invited to " + d.title + ". " + (d.taglines.hero || "");
    }

    /* ── Opening screen ────────────────────────────────── */
    set(".opening-small", d.taglines.opening);
    set(".opening-main-title", d.title);
    set(".opening-date", d.eventDate.display);

    /* ── Hero ──────────────────────────────────────────── */
    set(".hero-small", d.taglines.hero);
    set(".hero-main-title", d.title);
    set(".hero-date", d.eventDate.display);

    /* ── Hosts section ─────────────────────────────────── */
    var hostsSection = qs(".hosts");
    if (hostsSection) {
      var hostsIntro = qs(".hosts-intro");
      if (hostsIntro) hostsIntro.innerHTML = d.taglines.hostsIntro || "";

      var hostGrid = qs(".host-grid");
      if (hostGrid && d.hosts && d.hosts.length) {
        hostGrid.innerHTML = d.hosts
          .map(function (h) {
            return (
              '<div class="person reveal">' +
              (h.photo
                ? '<img class="person-photo" src="' + h.photo + '" alt="' + h.name + '">'
                : '<div class="person-photo-placeholder" aria-hidden="true">' + (d.icon || "✨") + "</div>") +
              '<div class="person-name">' + h.name + "</div>" +
              '<div class="person-role">' + (h.role || "") + "</div>" +
              "</div>"
            );
          })
          .join("");
      }
    }

    /* ── Story section ─────────────────────────────────── */
    var storyTitle = qs(".story .section-title");
    var storyText  = qs(".story .section-text");
    if (storyTitle) storyTitle.textContent = d.taglines.storyTitle || "";
    if (storyText)
      storyText.innerHTML = (d.taglines.storyBody || "").replace(/\n\n/g, "<br><br>");

    /* ── Events ────────────────────────────────────────── */
    var eventSections = document.getElementById("eventSections");
    if (eventSections) {
      eventSections.innerHTML = d.events
        .map(function (ev, i) {
          var dark = i % 2 !== 0;
          return (
            '<section class="event-section' +
            (dark ? " event-section--dark" : "") +
            '" aria-label="' + ev.title + '">' +
            '<div class="section-inner">' +
            '<div class="eyebrow reveal">' + (d.eventTypePlural || "Event Details") + "</div>" +
            '<div class="event-section-icon reveal">' + ev.icon + "</div>" +
            '<h2 class="section-title reveal">' + ev.title + "</h2>" +
            '<div class="event-section-meta reveal">' +
            ev.date + " &nbsp;·&nbsp; " + ev.time +
            "</div>" +
            '<p class="section-text reveal">' + ev.description + "</p>" +
            '<div class="event-section-venue reveal">' +
            '<div class="event-section-venue-name">' + ev.venue.name + "</div>" +
            '<div class="event-section-venue-address">' + ev.venue.address + "</div>" +
            '<a class="event-section-directions" href="' + ev.venue.mapsUrl +
            '" target="_blank" rel="noopener">Get Directions</a>' +
            "</div>" +
            "</div>" +
            "</section>"
          );
        })
        .join("");
      observeRevealElements();
    }

    /* ── Gallery ───────────────────────────────────────── */
    var galleryGrid = qs(".gallery-grid");
    if (galleryGrid && d.gallery && d.gallery.length) {
      galleryGrid.innerHTML = d.gallery
        .map(function (img) {
          return (
            '<div class="gallery-item' + (img.large ? " large" : "") + ' reveal">' +
            '<img src="' + img.src + '" alt="' + d.title + '">' +
            "</div>"
          );
        })
        .join("");
    }

    /* ── Footer ────────────────────────────────────────── */
    set(".footer-names", d.title);
    set(".footer-text", d.taglines.footerLine);

    /* ── Music source ──────────────────────────────────── */
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

  var opening    = document.getElementById("opening");
  var openButton = document.getElementById("openInvitation");

  if (openButton) {
    openButton.addEventListener("click", function () {
      opening.classList.add("hidden");
      document.body.style.overflow = "auto";
      startMusic();
    });
  }

  /* =========================================================
     MUSIC
  ========================================================= */

  var music        = document.getElementById("weddingMusic");
  var musicButton  = document.getElementById("musicButton");
  var musicPlaying = false;

  function startMusic() {
    if (!music || !music.src || music.src === window.location.href) return;
    music.play()
      .then(function () {
        musicPlaying = true;
        if (musicButton) musicButton.textContent = "♫";
      })
      .catch(function () {});
  }

  if (musicButton) {
    musicButton.addEventListener("click", function () {
      if (!music || !music.src || music.src === window.location.href) return;
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
  }

  /* =========================================================
     SCROLL REVEAL — initial pass
  ========================================================= */

  observeRevealElements();

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  (function initCountdown() {
    var grid = document.getElementById("countdownGrid");
    if (!grid) return;

    var eventDay  = eventData.eventDate.iso;
    var eventTime = eventData.eventDate.countdownTime || "18:00:00";
    var target    = new Date(eventDay + "T" + eventTime);

    function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

    function buildGrid(days, hours, minutes, seconds) {
      return (
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-days">' + pad(days) + "</span>" +
        '<span class="countdown-label">Days</span>' +
        "</div>" +
        '<span class="countdown-separator" aria-hidden="true">:</span>' +
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-hours">' + pad(hours) + "</span>" +
        '<span class="countdown-label">Hours</span>' +
        "</div>" +
        '<span class="countdown-separator" aria-hidden="true">:</span>' +
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-mins">' + pad(minutes) + "</span>" +
        '<span class="countdown-label">Minutes</span>' +
        "</div>" +
        '<span class="countdown-separator" aria-hidden="true">:</span>' +
        '<div class="countdown-unit">' +
        '<span class="countdown-number" id="cd-secs">' + pad(seconds) + "</span>" +
        '<span class="countdown-label">Seconds</span>' +
        "</div>"
      );
    }

    function tick() {
      var now  = Date.now();
      var diff = target - now;

      if (diff <= 0) {
        grid.innerHTML =
          '<p class="countdown-done">' +
          (eventData.taglines.countdownDone || "Today is the day! 🎉") +
          "</p>";
        return;
      }

      var totalSecs = Math.floor(diff / 1000);
      var secs      = totalSecs % 60;
      var totalMins = Math.floor(totalSecs / 60);
      var mins      = totalMins % 60;
      var totalHrs  = Math.floor(totalMins / 60);
      var hrs       = totalHrs % 24;
      var days      = Math.floor(totalHrs / 24);

      var cdDays = document.getElementById("cd-days");
      if (!cdDays) {
        grid.innerHTML = buildGrid(days, hrs, mins, secs);
        return;
      }

      var cdHours = document.getElementById("cd-hours");
      var cdMins  = document.getElementById("cd-mins");
      var cdSecs  = document.getElementById("cd-secs");

      if (cdDays.textContent  !== pad(days))  cdDays.textContent  = pad(days);
      if (cdHours.textContent !== pad(hrs))   cdHours.textContent = pad(hrs);
      if (cdMins.textContent  !== pad(mins))  cdMins.textContent  = pad(mins);
      if (cdSecs.textContent  !== pad(secs))  cdSecs.textContent  = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
  })();

  /* =========================================================
     PREVENT SCROLL WHILE OPENING SCREEN IS ACTIVE
  ========================================================= */

  document.body.style.overflow = "hidden";
})();
