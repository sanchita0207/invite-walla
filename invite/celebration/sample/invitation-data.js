/**
 * invitation-data.js — Celebration Sample
 * ─────────────────────────────────────────────────────────────
 * Sample invitation for a generic / multi-purpose celebration.
 * Use this as the base for any occasion not covered by the
 * other templates.
 */

const eventData = {

  /* ── Event identity ──────────────────────────────────────── */
  title:           "A Celebration of Joy",
  icon:            "✨",
  eventType:       "celebration",
  eventTypePlural: "The Celebration",

  /* ── Hosts ───────────────────────────────────────────────── */
  hosts: [
    {
      name:  "The Iyer Family",
      role:  "Hosting with love",
      photo: "images/host.svg",
    },
  ],

  /* ── Event date ──────────────────────────────────────────── */
  eventDate: {
    display:       "15 · AUGUST · 2027",
    iso:           "2027-08-15",
    countdownTime: "18:00:00",
  },

  /* ── Taglines ────────────────────────────────────────────── */
  taglines: {
    opening:      "You are warmly invited",
    hero:         "Come, let's celebrate together",
    hostsIntro:   "The Iyer family invites you to a joyful gathering to mark a special milestone — your presence is the greatest gift.",
    storyTitle:   "Some moments are worth celebrating together",
    storyBody:    "Life's best milestones are sweeter when shared. The Iyer family has reached one such moment, and they want nothing more than to celebrate it with you.\n\nCome, bring your joy, your stories and your appetite — there will be plenty of good food, great music and warm company.",
    footerLine:   "With love & gratitude ✨",
    countdownDone: "The celebration is here! 🎉",
  },

  /* ── Events ──────────────────────────────────────────────── */
  events: [
    {
      icon:        "✨",
      title:       "Evening Celebration",
      date:        "15 August 2027",
      time:        "6:00 PM onwards",
      description: "A joyful evening gathering with good food, warm company and a whole lot of celebration. Casual attire welcome.",
      venue: {
        name:    "ITC Grand Chola, Chennai",
        address: "63 Mount Road, Guindy, Chennai – 600 032",
        mapsUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
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
