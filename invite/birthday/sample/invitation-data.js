/**
 * invitation-data.js — Birthday Sample
 * ─────────────────────────────────────────────────────────────
 * Sample invitation for a milestone birthday celebration.
 */

const eventData = {

  /* ── Event identity ──────────────────────────────────────── */
  title:           "Riya turns 30!",
  icon:            "🎂",
  eventType:       "birthday",
  eventTypePlural: "Birthday Celebration",

  /* ── Hosts ───────────────────────────────────────────────── */
  hosts: [
    {
      name:  "Riya Kapoor",
      role:  "The Birthday Girl",
      photo: "images/host.svg",
    },
  ],

  /* ── Event date ──────────────────────────────────────────── */
  eventDate: {
    display:       "5 · APRIL · 2027",
    iso:           "2027-04-05",
    countdownTime: "20:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:      "You are cordially invited",
    hero:         "Let's celebrate in style",
    hostsIntro:   "Riya is turning 30 and she wants to celebrate this milestone with the people who matter most — you.",
    storyTitle:   "Thirty, flirty & thriving",
    storyBody:    "Three decades of laughter, adventures, friendships and memories. Riya has done it all with grace, style and a whole lot of dancing.\n\nNow it's time to celebrate the woman she's become — with the people who've been part of the journey.",
    footerLine:   "Here's to many more ✨",
    countdownDone: "The party has started! 🎉",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "🎉",
      title:       "Birthday Dinner & Party",
      date:        "5 April 2027",
      time:        "8:00 PM onwards",
      description: "A stylish evening of dinner, dancing and celebration. Dress code: Cocktail Glam. Gifts optional, presence mandatory.",
      venue: {
        name:    "Taj Mahal Palace, Mumbai",
        address: "Apollo Bunder, Colaba, Mumbai – 400 001",
        mapsUrl: "https://maps.google.com/?q=Taj+Mahal+Palace+Mumbai",
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
