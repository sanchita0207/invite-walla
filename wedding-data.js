/**
 * wedding-data.js
 * ─────────────────────────────────────────────
 * Central configuration file for the wedding
 * invitation. Edit the values below to customise
 * the invitation without touching the HTML.
 */

const weddingData = {

  /* ── Couple ──────────────────────────────── */
  bride: {
    name:         "Mitali",
    displayTitle: "Dr. Mitali",   // used on opening screen only
    photo: "images/bride.jpeg",
  },

  groom: {
    name:         "Karan",
    displayTitle: "Dr. Karan",    // used on opening screen only
    photo: "images/groom.jpeg",
  },

  /* ── Wedding date ────────────────────────── */
  weddingDate: {
    display:        "26 · NOVEMBER · 2026",  // shown on screen
    iso:            "2026-11-26",            // used for countdown
    countdownTime:  "20:00:00",             // reception starts 8:00 PM
  },

  /* ── Taglines ────────────────────────────── */
  taglines: {
    opening:   "Together with their families",
    hero:      "We're getting married",
    coupleIntro: "With the blessings of our families, we invite you to celebrate the beginning of our forever.",
    storyTitle: "And so the adventure begins",
    storyBody:  "Some stories are written in books. Ours was written in little moments, shared laughter, long conversations and countless memories.\n\nNow we're ready to begin the next chapter — together.",
    footerLine: "With love, forever",
  },

  /* ── Venue (primary / fallback) ─────────── */
  venue: {
    name:       "Hotel The Manor",
    street:     "Mehar Chand Road, Near SD College",
    city:       "Gurdaspur",
    state:      "Punjab",
    country:    "India",
    mapsUrl:    "https://maps.app.goo.gl/AbWsE37H7CGKCW2Y8",
  },

  /* ── Events ──────────────────────────────── */
  events: [
    {
      icon:        "✨",
      title:       "Sagan",
      date:        "25 November",
      time:        "7:00 PM",
      description: "The celebrations begin with the auspicious Sagan ceremony — blessings, joy and the warmth of family.",
      venue: {
        name:    "Hotel The Manor",
        address: "Mehar Chand Road, Near SD College, Gurdaspur, Punjab",
        mapsUrl: "https://maps.app.goo.gl/AbWsE37H7CGKCW2Y8",
      },
    },
    {
      icon:        "🌸",
      title:       "Haldi & Gharoli",
      date:        "26 November",
      time:        "11:00 AM",
      description: "A beautiful morning of age-old traditions, turmeric blessings and family celebrations.",
      venue: {
        name:    "Hotel The Manor",
        address: "Mehar Chand Road, Near SD College, Gurdaspur, Punjab",
        mapsUrl: "https://maps.app.goo.gl/AbWsE37H7CGKCW2Y8",
      },
    },
    {
      icon:        "💍",
      title:       "Wedding Reception",
      date:        "26 November",
      time:        "8:00 PM",
      description: "Join us as we welcome the Baraat and celebrate the beginning of our forever together.",
      venue: {
        name:    "Taj Heritage Garden",
        address: "Dinanagar, Gurdaspur, Punjab",
        mapsUrl: "https://maps.app.goo.gl/8eeu7XQ5WHhPvFbYA",
      },
    },
  ],

  /* ── Gallery images ──────────────────────── */
  gallery: [
    { src: "images/couple-1.jpeg", large: true },
    { src: "images/couple-2.jpg" },
    { src: "images/couple-3.jpg" },
    { src: "images/couple-4.jpg" },
    { src: "images/couple-5.jpg" },
  ],

  /* ── Music (optional) ────────────────────── */
  music: {
    src:  "",          // e.g. "music/wedding.mp3"
    type: "audio/mpeg",
  },

};
