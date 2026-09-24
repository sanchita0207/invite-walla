/**
 * invitation-data.js — Baby Shower Sample
 * ─────────────────────────────────────────────────────────────
 * Sample invitation for a baby shower.
 * Edit the values below to customise for your customer.
 */

const eventData = {

  /* ── Event identity ──────────────────────────────────────── */
  title:          "Baby Sharma is on the way!",
  icon:           "👶",
  eventType:      "baby",               // used for theme class
  eventTypePlural: "Baby Shower",

  /* ── Hosts (who is being celebrated / hosting) ───────────── */
  hosts: [
    {
      name:  "Priya Sharma",
      role:  "The Mum-to-be",
      photo: "images/host.svg",
    },
    {
      name:  "Vikram Sharma",
      role:  "The Dad-to-be",
      photo: "images/host-2.svg",
    },
  ],

  /* ── Event date ──────────────────────────────────────────── */
  eventDate: {
    display:       "12 · JULY · 2027",
    iso:           "2027-07-12",
    countdownTime: "16:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:      "A little one is on the way",
    hero:         "Join us for a baby shower",
    hostsIntro:   "Priya & Vikram are overjoyed to share the news and invite you to celebrate the arrival of their little bundle of joy.",
    storyTitle:   "The tiniest feet make the biggest footprints",
    storyBody:    "After years of dreams and a heart full of hope, Priya and Vikram are ready to welcome their greatest adventure yet.\n\nJoin us as we shower them with love, laughter and all things cute — because babies deserve the grandest welcome.",
    footerLine:   "With so much love ♡",
    countdownDone: "The little one has arrived! 👶",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "🎀",
      title:       "Baby Shower Celebration",
      date:        "12 July 2027",
      time:        "4:00 PM – 8:00 PM",
      description: "Join us for an afternoon of games, gifts and an abundance of baby love. Light refreshments and a special cake will be served.",
      venue: {
        name:    "The Oberoi, New Delhi",
        address: "Dr. Zakir Hussain Marg, New Delhi – 110 003",
        mapsUrl: "https://maps.google.com/?q=The+Oberoi+New+Delhi",
      },
    },
  ],

  /* ── Gallery ──────────────────────────────────────────────── */
  gallery: [
    { src: "images/gallery-1.svg", large: true },
    { src: "images/gallery-2.svg" },
    { src: "images/gallery-3.svg" },
  ],

  /* ── Music (optional) ─────────────────────────────────────── */
  music: {
    src:  "",
    type: "audio/mpeg",
  },

};
