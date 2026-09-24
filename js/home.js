/* =========================================================
   InviteWalla — Homepage JS  v3
   js/home.js
   =========================================================
   Pure vanilla JS. No dependencies. Static-site safe.
   All animations respect prefers-reduced-motion.
========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =========================================================
     HERO ENTRANCE ANIMATION SEQUENCE
  ========================================================= */

  function triggerHeroAnimations() {
    if (prefersReduced) {
      document.querySelectorAll(".iw-hero-anim").forEach(el => el.classList.add("iw-hero-in"));
      document.querySelectorAll(".iw-hero-script").forEach(el => el.classList.add("iw-script-in"));
      return;
    }

    // Stagger hero center elements (CSS transition-delay handles timing)
    const heroAnims = document.querySelectorAll(".iw-hero-anim");
    heroAnims.forEach((el, i) => {
      setTimeout(() => el.classList.add("iw-hero-in"), 80 + i * 110);
    });

    // Handwriting reveal on the right panel
    const scripts = document.querySelectorAll(".iw-hero-script");
    scripts.forEach((el, i) => {
      setTimeout(() => el.classList.add("iw-script-in"), 900 + i * 320);
    });
  }

  // Fire immediately on page load
  triggerHeroAnimations();


  /* =========================================================
     HERO ENVELOPE — hover / click interaction
  ========================================================= */

  const heroEnvelope = document.getElementById("iwHeroEnvelope");
  if (heroEnvelope && !prefersReduced) {
    heroEnvelope.addEventListener("mouseenter", () => {
      heroEnvelope.style.transition = "transform .3s ease";
      heroEnvelope.style.transform  = "translateY(-8px) rotate(0deg) scale(1.04)";
    });
    heroEnvelope.addEventListener("mouseleave", () => {
      heroEnvelope.style.transform  = "";
      heroEnvelope.style.transition = "";
    });
    heroEnvelope.addEventListener("click", () => {
      heroEnvelope.style.transition = "transform .15s ease";
      heroEnvelope.style.transform  = "rotate(-5deg) scale(0.96)";
      setTimeout(() => {
        heroEnvelope.style.transform = "rotate(4deg) scale(1.03)";
        setTimeout(() => {
          heroEnvelope.style.transform  = "";
          heroEnvelope.style.transition = "";
        }, 200);
      }, 150);
    });
  }


  /* =========================================================
     FLOATING HEARTS — subtle natural variance
  ========================================================= */

  if (!prefersReduced) {
    document.querySelectorAll(".hero-heart").forEach((el) => {
      const dur = (3.2 + Math.random() * 1.8).toFixed(1);
      el.style.animationDuration = `${dur}s`;
    });
  }


  /* =========================================================
     NAV — mobile menu: close on link click
     (scroll shadow + toggle wired in js/shared.js)
  ========================================================= */

  const mobileMenu = document.getElementById("iwMobileMenu");
  const navToggle  = document.getElementById("iwNavToggle");

  if (mobileMenu && navToggle) {
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.hidden = true;
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================================================
     SCROLL REVEAL (IntersectionObserver)
  ========================================================= */

  function initReveal() {
    if (prefersReduced) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -48px 0px" });

    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  }

  initReveal();


  /* =========================================================
     SMOOTH SCROLL for anchor links
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start"
      });
    });
  });


  /* =========================================================
     OCCASIONS — interactive selector + card swap
  ========================================================= */

  const occasionsTrack = document.getElementById("iwOccasionsTrack");
  const activeLabel    = document.getElementById("iwActiveOccLabel");
  const occSampleLink  = document.getElementById("iwOccSampleLink");

  // Map occasion card keys to sample invite URLs
  const occSampleUrls = {
    wedding:      "invite/wedding/aanya-rohan/",
    birthday:     "invite/birthday/sample/",
    baby:         "invite/baby-shower/sample/",
    engagement:   "invite/engagement/sample/",
    anniversary:  "invite/anniversary/sample/",
    housewarming: "invite/housewarming/sample/",
    party:        "invite/party/sample/",
    celebration:  "invite/celebration/sample/",
  };

  if (occasionsTrack) {
    const items = occasionsTrack.querySelectorAll(".iw-occasion");

    function setActiveOccasion(el) {
      items.forEach(i => i.classList.remove("iw-occasion--active"));
      el.classList.add("iw-occasion--active");

      // Animate label
      if (activeLabel) {
        activeLabel.style.opacity   = "0";
        activeLabel.style.transform = "translateY(8px)";
        setTimeout(() => {
          activeLabel.textContent = el.dataset.label || "";
          activeLabel.style.opacity   = "1";
          activeLabel.style.transform = "none";
          activeLabel.style.transition = "opacity .25s ease, transform .3s ease";
        }, 180);
      }

      // Swap card visual
      const cardKey = el.dataset.card;
      if (cardKey) {
        document.querySelectorAll(".iw-occ-card").forEach(card => {
          card.classList.toggle("iw-occ-card--active", card.dataset.occ === cardKey);
        });
      }

      // Update "See a sample" link
      if (occSampleLink && cardKey) {
        const sampleUrl = occSampleUrls[cardKey];
        if (sampleUrl) {
          occSampleLink.href = sampleUrl;
          occSampleLink.setAttribute("aria-label", "See a sample " + (el.dataset.label || "") + " invitation");
        }
      }
    }

    items.forEach(item => {
      item.addEventListener("click", () => { if (!dragMoved) setActiveOccasion(item); });
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveOccasion(item); }
      });
    });

    // Drag-to-scroll
    let isDragging = false, dragMoved = false, startX = 0, scrollLeft = 0;
    const wrap = occasionsTrack.parentElement;
    if (wrap) {
      wrap.addEventListener("mousedown", (e) => { isDragging = true; dragMoved = false; startX = e.pageX - wrap.offsetLeft; scrollLeft = wrap.scrollLeft; });
      wrap.addEventListener("mouseleave", () => { isDragging = false; });
      wrap.addEventListener("mouseup",    () => { isDragging = false; });
      wrap.addEventListener("mousemove",  (e) => {
        if (!isDragging) return;
        const x = e.pageX - wrap.offsetLeft;
        if (Math.abs(x - startX) > 4) { dragMoved = true; e.preventDefault(); wrap.scrollLeft = scrollLeft - (x - startX); }
      });
    }

    // Initialise the link href from the already-active pill on page load
    const initialActive = occasionsTrack.querySelector(".iw-occasion--active");
    if (initialActive) setActiveOccasion(initialActive);
  }


  /* =========================================================
     DEMO STACK — auto-advance when in view
  ========================================================= */

  const demoStack = document.getElementById("iwDemoStack");
  const demoPips  = document.querySelectorAll(".iw-demo-pip");

  const demoLayers = demoStack ? [
    document.getElementById("iwDemoCardCover"),
    document.getElementById("iwDemoStory"),
    document.getElementById("iwDemoEvents"),
    document.getElementById("iwDemoVenue"),
  ] : [];

  let currentLayer = 0;
  let demoTimer    = null;

  function showDemoLayer(idx) {
    demoLayers.forEach((l, i) => { if (l) l.classList.toggle("active", i === idx); });
    demoPips.forEach((p, i) => p.classList.toggle("iw-demo-pip--active", i === idx));
    currentLayer = idx;
  }

  if (demoLayers[0]) demoLayers[0].classList.add("active");
  if (demoPips[0])   demoPips[0].classList.add("iw-demo-pip--active");

  if (demoStack && !prefersReduced) {
    const demoIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!demoTimer) {
            demoTimer = setInterval(() => {
              const next = (currentLayer + 1) % demoLayers.filter(Boolean).length;
              showDemoLayer(next);
            }, 2600);
          }
        } else {
          clearInterval(demoTimer);
          demoTimer = null;
        }
      });
    }, { threshold: 0.3 });
    demoIo.observe(demoStack);

    demoPips.forEach((pip, i) => {
      pip.addEventListener("click", () => {
        clearInterval(demoTimer);
        demoTimer = null;
        showDemoLayer(i);
      });
    });
  }


  /* =========================================================
     ONE LINK — expand animation on scroll into view
  ========================================================= */

  const linkExpands = document.getElementById("iwLinkExpands");

  if (linkExpands && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => linkExpands.classList.add("expanded"), 450);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    io.observe(linkExpands.parentElement || linkExpands);
  } else if (linkExpands) {
    linkExpands.classList.add("expanded");
  }


  /* =========================================================
     ENQUIRY FORM — validation + WhatsApp fallback
  ========================================================= */

  const form      = document.getElementById("enquiryForm");
  const statusBox = document.getElementById("formStatus");

  if (form) {

    function showError(fieldId, msg) {
      const err   = document.getElementById("error-" + fieldId);
      const input = document.getElementById("field-" + fieldId);
      if (err)   err.textContent = msg;
      if (input) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", "error-" + fieldId);
      }
    }

    function clearErrors() {
      form.querySelectorAll(".iw-field-error").forEach(el => el.textContent = "");
      form.querySelectorAll("[aria-invalid]").forEach(el => {
        el.removeAttribute("aria-invalid");
        el.removeAttribute("aria-describedby");
      });
    }

    function validate(data) {
      let ok = true;

      if (!data.get("name") || data.get("name").trim().length < 2) {
        showError("name", "Please enter your name.");
        ok = false;
      }

      const phone = (data.get("whatsapp") || "").replace(/\s/g, "");
      if (!phone || phone.length < 7) {
        showError("whatsapp", "Please enter a valid WhatsApp number.");
        ok = false;
      }

      const email = data.get("email");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("email", "Please enter a valid email address.");
        ok = false;
      }

      if (!data.get("occasion")) {
        showError("occasion", "Please select an occasion.");
        ok = false;
      }

      return ok;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const data = new FormData(form);
      if (!validate(data)) return;

      /*
        ─────────────────────────────────────────────────────
        FORM SUBMISSION — replace with Formspree / EmailJS:

        Option A — Formspree:
          fetch("https://formspree.io/f/YOUR_ID", {
            method: "POST", body: data,
            headers: { "Accept": "application/json" }
          }).then(r => r.ok ? showSuccess() : showFormError())
            .catch(showFormError);
        ─────────────────────────────────────────────────────
      */

      // Fallback: open WhatsApp with pre-filled message
      const name     = data.get("name")     || "";
      const occasion = data.get("occasion") || "";
      const message  = data.get("message")  || "";

      const waText = encodeURIComponent(
        `Hi InviteWalla, I'd like to create an invitation.\n\nName: ${name}\nOccasion: ${occasion}${message ? "\nDetails: " + message : ""}`
      );

      const waNumber = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.whatsappNumber)
        ? SITE_CONFIG.whatsappNumber
        : "917055747717";

      window.open(`https://wa.me/${waNumber}?text=${waText}`, "_blank", "noopener");

      showSuccess();
    });

    function showSuccess() {
      if (!statusBox) return;
      statusBox.hidden = false;
      statusBox.className = "iw-form-status iw-form-status--success";
      statusBox.textContent = "Thank you! We'll be in touch shortly.";
      form.querySelectorAll("input, select, textarea").forEach(el => {
        if (el.type !== "submit") el.value = "";
      });
    }

    function showFormError() {
      if (!statusBox) return;
      statusBox.hidden = false;
      statusBox.className = "iw-form-status iw-form-status--error";
      statusBox.textContent = "Something went wrong. Please try WhatsApp instead.";
    }
  }


  /* =========================================================
     SITE CONFIG — apply contact details from site-config.js
  ========================================================= */

  if (typeof SITE_CONFIG !== "undefined") {

    if (SITE_CONFIG.whatsappNumber) {
      const waNumber = SITE_CONFIG.whatsappNumber;

      // Generic "create an invitation" CTA links
      const waHrefGeneric = `https://wa.me/${waNumber}?text=Hi%2C%20I%27d%20like%20to%20create%20an%20invitation%20with%20InviteWalla.`;
      document.querySelectorAll("[data-wa-link]").forEach(el => { el.href = waHrefGeneric; });

      // Pricing card links — use their specific pre-filled messages
      const pricingMessages = {
        digital:  `Hi%20InviteWalla%2C%20I%27d%20like%20a%20Digital%20Invitation%20for%20my%20event.`,
        video:    `Hi%20InviteWalla%2C%20I%27d%20like%20a%20Video%20Invitation%20for%20my%20event.`,
        complete: `Hi%20InviteWalla%2C%20I%27d%20like%20the%20Complete%20Invitation%20%E2%80%94%20Web%20%2B%20Video.`,
      };

      const priceCtaEls = document.querySelectorAll("[data-price-wa]");
      priceCtaEls.forEach((el, i) => {
        const keys = Object.keys(pricingMessages);
        const msg  = pricingMessages[keys[i]] || pricingMessages.digital;
        el.href = `https://wa.me/${waNumber}?text=${msg}`;
      });
    }

    if (SITE_CONFIG.instagramUsername) {
      const igHref = `https://instagram.com/${SITE_CONFIG.instagramUsername}`;
      document.querySelectorAll("[data-ig-link]").forEach(el => {
        el.href = igHref;
        if (el.dataset.igHandle) el.textContent = `@${SITE_CONFIG.instagramUsername}`;
      });
    }

  }


  /* =========================================================
     FOOTER — current year
  ========================================================= */

  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* =========================================================
     STORY CARDS — subtle cursor-tilt on hover
  ========================================================= */

  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".iw-story-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const r    = card.getBoundingClientRect();
        const x    = (e.clientX - r.left) / r.width  - 0.5;
        const y    = (e.clientY - r.top)  / r.height - 0.5;
        const rotX = -(y * 10).toFixed(2);
        const rotY =  (x * 10).toFixed(2);
        card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
        card.style.zIndex    = "10";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.zIndex    = "";
      });
    });
  }


  /* =========================================================
     PRICING CARDS — staggered entrance via IntersectionObserver
  ========================================================= */

  if (!prefersReduced) {
    const pricingCards = document.querySelectorAll(".iw-price-card");
    if (pricingCards.length) {
      const cardIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card  = entry.target;
            const idx   = Array.from(pricingCards).indexOf(card);
            setTimeout(() => {
              card.classList.add("visible");
            }, idx * 120);
            cardIo.unobserve(card);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

      pricingCards.forEach(card => cardIo.observe(card));
    }
  } else {
    document.querySelectorAll(".iw-price-card").forEach(el => el.classList.add("visible"));
  }

})();
