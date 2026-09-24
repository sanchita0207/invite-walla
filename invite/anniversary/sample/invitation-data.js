/**
 * invitation-data.js — Anniversary Sample
 * ─────────────────────────────────────────────────────────────
 * Sample invitation for a 25th wedding anniversary celebration.
 */

const eventData = {

  /* ── Event identity ──────────────────────────────────────── */
  title:           "25 Years of Us",
  icon:            "🌹",
  eventType:       "anniversary",
  eventTypePlural: "Anniversary Celebration",

  /* ── Hosts ───────────────────────────────────────────────── */
  hosts: [
    {
      name:  "Sunita Verma",
      role:  "25 years & counting",
      photo: "images/bride.svg",
    },
    {
      name:  "Rajesh Verma",
      role:  "25 years & counting",
      photo: "images/groom.svg",
    },
  ],

  /* ── Event date ──────────────────────────────────────────── */
  eventDate: {
    display:       "20 · DECEMBER · 2027",
    iso:           "2027-12-20",
    countdownTime: "19:30:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:      "25 years of love, laughter & forever",
    hero:         "A quarter century of us",
    hostsIntro:   "Sunita & Rajesh invite you to join them as they celebrate 25 beautiful years of love, family and togetherness.",
    storyTitle:   "Still my favourite story",
    storyBody:    "Twenty-five years ago, a young couple made promises they had no idea would be this easy to keep.\n\nThrough every season — joyful and challenging — Sunita and Rajesh have chosen each other, every single day. Now they gather those they love to say: the best chapters are still ahead.",
    footerLine:   "To forever and beyond 🌹",
    countdownDone: "Happy anniversary! 🥂",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "🌹",
      title:       "Silver Jubilee Celebration",
      date:        "20 December 2027",
      time:        "7:30 PM",
      description: "A grand celebration of 25 years together. Join us for an evening of nostalgia, music and heartfelt moments.",
      venue: {
        name:    "Grand Hyatt, Chennai",
        address: "Mount Road, Anna Salai, Chennai – 600 006",
        mapsUrl: "https://maps.google.com/?q=Grand+Hyatt+Chennai",
      },
    },
  ],

  /* ── Gallery ─────────────────────────────────────────────── */
  gallery: [
    { src: "images/couple-1.svg", large: true },
    { src: "images/couple-2.svg" },
    { src: "images/couple-3.svg" },
    { src: "images/couple-4.svg" },
  ],

  /* ── Music ───────────────────────────────────────────────── */
  music: {
    src:  "",
    type: "audio/mpeg",
  },

};
