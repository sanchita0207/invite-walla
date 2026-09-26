/**
 * invitation-data.js — Mitali & Karan (Royal Edition)
 * ─────────────────────────────────────────────────────────────
 * Data config for the experimental Royal invitation.
 * This is completely isolated from /invite/wedding/mitali-karan/
 * Do NOT import or reference this file from the original page.
 */

const royalInvitation = {

  /* ── Couple ──────────────────────────────────────────────── */
  bride: {
    name:         "Mitali",
    displayTitle: "Dr. Mitali",
    photo:        "../mitali-karan/images/bride.jpeg",
    role:         "The Bride",
  },

  groom: {
    name:         "Karan",
    displayTitle: "Dr. Karan",
    photo:        "../mitali-karan/images/groom.jpeg",
    role:         "The Groom",
  },

  /* ── Wedding date ────────────────────────────────────────── */
  weddingDate: {
    display:       "26 · November · 2026",
    iso:           "2026-11-26",
    countdownTime: "20:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:       "Together with their families",
    hero:          "We're getting married",
    invite:        "We warmly invite you to celebrate the beginning of our forever and be a part of our special day.",
    coupleEyebrow: "The Couple",
    coupleTitle:   "Two souls, one journey",
    coupleIntro:   "With grateful hearts, we invite you to celebrate the beginning of our forever.",
    storyEyebrow:  "Our Story",
    storyTitle:    "And so the adventure begins",
    storyBody:     "It all started with the little moments — shared laughter, long conversations and countless memories.\n\nToday, we begin the next chapter together, and we can't wait to have you with us on this beautiful journey.",
    memoriesEyebrow: "Memories",
    memoriesTitle: "A few moments of us",
    countdownEyebrow: "Counting Down",
    countdownTitle: "The big day is almost here",
    footerLine:    "With Love, Forever",
  },

  /* ── Gallery images — reuse from original invitation ────── */
  gallery: [
    { src: "../mitali-karan/images/couple-1.jpeg", large: true },
    { src: "../mitali-karan/images/couple-2.jpg" },
    { src: "../mitali-karan/images/couple-3.jpg" },
    { src: "../mitali-karan/images/couple-4.jpg" },
    { src: "../mitali-karan/images/couple-5.jpg" },
  ],

  /* ── Music — reuse from original ────────────────────────── */
  music: {
    src:  "../mitali-karan/audio/music.mp3",
    type: "audio/mp3",
  },

  /* ── Assets (all from karan-mitali images folder) ────────── */
  assets: {
    heroArch:         "../karan-mitali/images/hero-arch.png",
    palaceLakeBg:     "../karan-mitali/images/palace-lake.png",
    mobileHeroBg:     "../karan-mitali/images/mobile-section-bg.png",
    mobileSectionBg:  "../karan-mitali/images/mobile-section-bg.png",
    peacock:          "../karan-mitali/images/peacock-left.png",
    chhatri:          "../karan-mitali/images/chhatri-right.png",
    lanterns:         "../karan-mitali/images/lanterns.png",
    floralCluster:    "../karan-mitali/images/floral-corner-left.png",
    floralLeft:       "../karan-mitali/images/floral-top.png",
    floralRight:      "../karan-mitali/images/floral-top.png",
    floralBranch:     "../karan-mitali/images/floral-branches.png",
    palaceSilhouette: "../karan-mitali/images/balcony.png",
    photoFrame:       "../karan-mitali/images/photo-frame.png",
    ornament:         "../karan-mitali/images/ornaments-left.png",
    texture:          null,
  },

};
