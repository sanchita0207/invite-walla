/* =========================================================
   InviteWalla — Analytics Event Tracking
   js/analytics.js
   =========================================================
   Requires GA4 to be initialised first (via shared.js or
   the inline snippet on invite pages).

   Events fired:
   ─────────────────────────────────────────────────────────
   whatsapp_click
     · type: 'digital_invitation' | 'video_invitation'
              | 'combo_invitation' | 'general' | 'faq'
     · source: element text / label
     · location: current page path

   section_view
     · section_id: 'pricing' | 'showcase' | 'how-it-works'
                   | 'enquire' etc.

   invitation_example_view
     · invite_slug: e.g. 'aanya-rohan'

   enquiry_form_submit
     · occasion: selected occasion value
   ─────────────────────────────────────────────────────────
   Device type and geography are captured automatically
   by GA4 — no custom code needed for those.
========================================================= */

(function () {
  "use strict";

  /* ── Helper: fire a GA4 event safely ──────────────────── */
  function track(eventName, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", eventName, params || {});
  }

  /* ── Helper: current page path ────────────────────────── */
  var page = window.location.pathname;


  /* =========================================================
     1. WHATSAPP CTA CLICKS
     ─────────────────────────────────────────────────────────
     Covers:
       [data-price-wa]  — pricing card CTAs (3 products)
       [data-wa-link]   — generic "create" CTAs
       .iw-faqpage-cta  — FAQ page WhatsApp button
       Any other <a> pointing to wa.me
  ========================================================= */

  document.addEventListener("click", function (e) {
    var el = e.target.closest("a[href*='wa.me']");
    if (!el) return;

    var type   = "general";
    var source = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);

    /* Distinguish the three pricing products by their data-price-wa siblings */
    if (el.hasAttribute("data-price-wa")) {
      var card = el.closest("article.iw-price-card");
      if (card) {
        var eyebrow = card.querySelector(".iw-price-eyebrow");
        if (eyebrow) {
          var label = eyebrow.textContent.toLowerCase();
          if      (label.indexOf("web + video") !== -1) type = "combo_invitation";
          else if (label.indexOf("video")        !== -1) type = "video_invitation";
          else                                           type = "digital_invitation";
        }
      }
    } else if (el.closest(".iw-faqpage-cta")) {
      type = "faq";
    }

    track("whatsapp_click", {
      type:     type,
      source:   source,
      location: page,
    });
  });


  /* =========================================================
     2. SECTION VIEWS (pricing, showcase, how-it-works, enquire)
     ─────────────────────────────────────────────────────────
     Uses IntersectionObserver — fires once per section per
     page load.
  ========================================================= */

  var sectionsToTrack = [
    "pricing",
    "showcase",
    "how-it-works",
    "enquire",
    "occasions",
    "story",
    "faq-snippet",
    "compare",
  ];

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          track("section_view", {
            section_id: entry.target.id,
            location:   page,
          });
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    sectionsToTrack.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }


  /* =========================================================
     3. INVITATION EXAMPLE VIEWS
     ─────────────────────────────────────────────────────────
     Fires when an /invite/* page loads. The slug is read
     from the URL path.
  ========================================================= */

  var inviteMatch = page.match(/\/invite\/([^/]+)/);
  if (inviteMatch) {
    track("invitation_example_view", {
      invite_slug: inviteMatch[1],
    });
  }


  /* =========================================================
     4. ENQUIRY FORM SUBMIT
     ─────────────────────────────────────────────────────────
     Hooks into the existing form submit flow in home.js by
     listening on the form element directly.
  ========================================================= */

  var enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function () {
      var occasion = (enquiryForm.querySelector('[name="occasion"]') || {}).value || "";
      track("enquiry_form_submit", {
        occasion: occasion,
        location: page,
      });
    }, /* capture: */ true); /* capture phase so it fires before home.js's handler */
  }


  /* =========================================================
     5. FAQ SNIPPET EXPAND (homepage <details> accordion)
     ─────────────────────────────────────────────────────────
     Fires when a user expands a question on the homepage.
  ========================================================= */

  var trustFaq = document.querySelector(".iw-trust-faq");
  if (trustFaq) {
    trustFaq.addEventListener("toggle", function (e) {
      if (e.target && e.target.open) {
        var q = e.target.querySelector(".iw-trust-q");
        track("faq_snippet_expand", {
          question: q ? q.textContent.trim().slice(0, 80) : "",
          location: page,
        });
      }
    }, true);
  }

})();
