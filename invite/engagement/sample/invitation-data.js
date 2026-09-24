/**
 * invitation-data.js — Engagement Sample
 * ─────────────────────────────────────────────────────────────
 * Sample invitation for an engagement ceremony.
 */

const eventData = {

  /* ── Event identity ──────────────────────────────────────── */
  title:           "Meera & Dev — Engaged!",
  icon:            "💎",
  eventType:       "engagement",
  eventTypePlural: "Engagement Celebration",

  /* ── Hosts ───────────────────────────────────────────────── */
  hosts: [
    {
      name:  "Meera Nair",
      role:  "The Bride-to-be",
      photo: "images/bride.svg",
    },
    {
      name:  "Dev Khanna",
      role:  "The Groom-to-be",
      photo: "images/groom.svg",
    },
  ],

  /* ── Event date ──────────────────────────────────────────── */
  eventDate: {
    display:       "18 · MAY · 2027",
    iso:           "2027-05-18",
    countdownTime: "19:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:      "They said yes!",
    hero:         "She said yes — he said always",
    hostsIntro:   "Meera & Dev joyfully invite you to celebrate as they take the first step towards forever.",
    storyTitle:   "A love story written in the stars",
    storyBody:    "It was a monsoon evening in Delhi when Dev got down on one knee. Meera's \"yes\" echoed through the rain and set the whole world right.\n\nNow they invite the people who love them most to witness the beginning of their forever.",
    footerLine:   "With joy & gratitude 💎",
    countdownDone: "They're engaged! 💍",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "💍",
      title:       "Ring Ceremony",
      date:        "18 May 2027",
      time:        "5:30 PM",
      description: "The formal exchange of rings, surrounded by family and blessings. A moment to mark the beginning of a beautiful journey.",
      venue: {
        name:    "The Leela Palace, New Delhi",
        address: "Diplomatic Enclave, Chanakyapuri, New Delhi – 110 023",
        mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+New+Delhi",
      },
    },
    {
      icon:        "🥂",
      title:       "Engagement Dinner",
      date:        "18 May 2027",
      time:        "8:00 PM",
      description: "Celebrate with us over dinner, dancing and toasts to the happy couple. Formal attire.",
      venue: {
        name:    "The Leela Palace, New Delhi",
        address: "Diplomatic Enclave, Chanakyapuri, New Delhi – 110 023",
        mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+New+Delhi",
      },
    },
  ],

  /* ── Gallery ─────────────────────────────────────────────── */
  gallery: [
    { src: "images/couple-1.svg", large: true },
    { src: "images/couple-2.svg" },
    { src: "images/couple-3.svg" },
  ],

  /* ── Music ───────────────────────────────────────────────── */
  music: {
    src:  "",
    type: "audio/mpeg",
  },

};
