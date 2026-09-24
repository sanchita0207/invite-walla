/**
 * invitation-data.js — Party Sample
 * ─────────────────────────────────────────────────────────────
 * Sample invitation for a New Year's Eve party.
 */

const eventData = {

  /* ── Event identity ──────────────────────────────────────── */
  title:           "New Year's Eve Gala 2027",
  icon:            "🎉",
  eventType:       "party",
  eventTypePlural: "The Party",

  /* ── Hosts ───────────────────────────────────────────────── */
  hosts: [
    {
      name:  "Sahil & Kavya",
      role:  "Your hosts for the evening",
      photo: "images/host.svg",
    },
  ],

  /* ── Event date ──────────────────────────────────────────── */
  eventDate: {
    display:       "31 · DECEMBER · 2027",
    iso:           "2027-12-31",
    countdownTime: "21:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:      "The countdown begins",
    hero:         "Ring in 2028 with us",
    hostsIntro:   "Sahil & Kavya invite you to bid farewell to 2027 with an unforgettable evening of music, dancing and good company.",
    storyTitle:   "Every new year deserves a legendary send-off",
    storyBody:    "Good friends, great music and a rooftop view of the city skyline — that's all you need for the perfect New Year's Eve.\n\nCome as you are. Dance until midnight. Ring in 2028 with us.",
    footerLine:   "See you at the party 🎊",
    countdownDone: "Happy New Year! 🎆",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "🥂",
      title:       "New Year's Eve Gala",
      date:        "31 December 2027",
      time:        "9:00 PM – 2:00 AM",
      description: "Cocktails, canapés, a live DJ and a rooftop countdown. Black-tie optional. Fun mandatory.",
      venue: {
        name:    "Bandra Rooftop, Mumbai",
        address: "Rooftop, Hill Road, Bandra West, Mumbai – 400 050",
        mapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai",
      },
    },
  ],

  /* ── Gallery ─────────────────────────────────────────────── */
  gallery: [
    { src: "images/gallery-1.svg", large: true },
    { src: "images/gallery-2.svg" },
    { src: "images/gallery-3.svg" },
  ],

  /* ── Music ───────────────────────────────────────────────── */
  music: {
    src:  "",
    type: "audio/mpeg",
  },

};
