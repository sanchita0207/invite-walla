/**
 * invitation-data.js — Housewarming Sample
 * ─────────────────────────────────────────────────────────────
 * Sample invitation for a housewarming / griha pravesh.
 */

const eventData = {

  /* ── Event identity ──────────────────────────────────────── */
  title:           "The Patels' New Home",
  icon:            "🏡",
  eventType:       "housewarming",
  eventTypePlural: "Griha Pravesh",

  /* ── Hosts ───────────────────────────────────────────────── */
  hosts: [
    {
      name:  "The Patel Family",
      role:  "Warmly invites you",
      photo: "images/host.svg",
    },
  ],

  /* ── Event date ──────────────────────────────────────────── */
  eventDate: {
    display:       "14 · SEPTEMBER · 2027",
    iso:           "2027-09-14",
    countdownTime: "11:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:      "A new beginning",
    hero:         "Our home is now open",
    hostsIntro:   "The Patel family joyfully invite you to be part of the very first celebrations in their new home.",
    storyTitle:   "Every house becomes a home with the right people in it",
    storyBody:    "After years of dreaming, planning and a whole lot of patience, the Patels have found the place they call home.\n\nNow they want to fill it with the warmth, laughter and blessings of the people they love most. Please join them for the Griha Pravesh ceremony.",
    footerLine:   "Our home is your home 🏡",
    countdownDone: "Welcome home! 🎊",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "🪔",
      title:       "Griha Pravesh Puja",
      date:        "14 September 2027",
      time:        "11:00 AM",
      description: "An auspicious puja to bless the new home. Followed by a traditional lunch.",
      venue: {
        name:    "The Patel Residence",
        address: "Plot 42, Koregaon Park, Pune – 411 001",
        mapsUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
      },
    },
    {
      icon:        "🎊",
      title:       "Housewarming Party",
      date:        "14 September 2027",
      time:        "7:00 PM",
      description: "Evening celebrations — cocktails, dinner and the company of dear friends. Come see the new place!",
      venue: {
        name:    "The Patel Residence",
        address: "Plot 42, Koregaon Park, Pune – 411 001",
        mapsUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
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
