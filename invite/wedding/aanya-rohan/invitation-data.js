/**
 * invitation-data.js — Aanya & Rohan
 * ─────────────────────────────────────────────────────────────
 * All customer-specific content lives here.
 * The HTML/CSS presentation layer reads from weddingData and
 * never needs to be edited for content changes.
 */

const weddingData = {

  /* ── Couple ──────────────────────────────────────────────── */
  bride: {
    name:         "Aanya",
    displayTitle: "Aanya Sharma",
    photo:        "images/bride.svg",
  },

  groom: {
    name:         "Rohan",
    displayTitle: "Rohan Mehta",
    photo:        "images/groom.svg",
  },

  /* ── Wedding date ────────────────────────────────────────── */
  weddingDate: {
    display:       "14 · FEBRUARY · 2027",
    iso:           "2027-02-14",
    countdownTime: "19:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:     "Together with their families",
    hero:        "We're getting married",
    coupleIntro: "With the warmth of our families and the joy in our hearts, we invite you to be part of our forever.",
    storyTitle:  "Written in the stars",
    storyBody:   "It started with a chance meeting at a friend's rooftop in Mumbai — one conversation that somehow never ended.\n\nNow, after three years of adventures, late-night drives and a thousand little moments, we're ready to begin the greatest chapter yet.",
    footerLine:  "With love, always",
  },

  /* ── Primary venue ───────────────────────────────────────── */
  venue: {
    name:    "The St. Regis Mumbai",
    street:  "462 Senapati Bapat Marg",
    city:    "Mumbai",
    state:   "Maharashtra",
    country: "India",
    mapsUrl: "https://maps.google.com/?q=The+St+Regis+Mumbai",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "🌸",
      title:       "Mehendi & Sangeet",
      date:        "13 February",
      time:        "6:00 PM",
      description: "An evening of colour, music and dancing as we celebrate the night before the big day with the people we love most.",
      venue: {
        name:    "The St. Regis Mumbai",
        address: "462 Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra",
        mapsUrl: "https://maps.google.com/?q=The+St+Regis+Mumbai",
      },
    },
    {
      icon:        "💍",
      title:       "Wedding Ceremony",
      date:        "14 February",
      time:        "11:00 AM",
      description: "Under the mandap, surrounded by family and flowers, we take our vows and begin our forever.",
      venue: {
        name:    "The St. Regis Mumbai",
        address: "462 Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra",
        mapsUrl: "https://maps.google.com/?q=The+St+Regis+Mumbai",
      },
    },
    {
      icon:        "✨",
      title:       "Reception",
      date:        "14 February",
      time:        "7:00 PM",
      description: "Join us for an evening of celebration, good food and great company as Mr. & Mrs. Mehta make their grand entrance.",
      venue: {
        name:    "The St. Regis Rooftop",
        address: "462 Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra",
        mapsUrl: "https://maps.google.com/?q=The+St+Regis+Mumbai",
      },
    },
  ],

  /* ── Gallery images ──────────────────────────────────────── */
  gallery: [
    { src: "images/couple-1.svg", large: true },
    { src: "images/couple-2.svg" },
    { src: "images/couple-3.svg" },
    { src: "images/couple-4.svg" },
    { src: "images/couple-5.svg" },
  ],

  /* ── Music (optional) ────────────────────────────────────── */
  music: {
    src:  "",
    type: "audio/mpeg",
  },

};
