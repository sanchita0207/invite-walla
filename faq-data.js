/* =========================================================
   InviteWalla — FAQ Data
   faq-data.js
   =========================================================
   Edit questions and answers here. The FAQ page reads
   this file and renders everything automatically —
   HTML accordion, structured data (JSON-LD), all of it.

   Structure:
     FAQ_DATA = array of groups, each with:
       - icon   : emoji shown in the group heading
       - title  : group heading text
       - items  : array of { q, a } question/answer pairs
=========================================================  */

var FAQ_DATA = [

  {
    icon:  "💬",
    title: "Ordering & Process",
    items: [
      {
        q: "How do I order a digital wedding invitation?",
        a: "Simply message us on WhatsApp with your names, event date, venue and any photos. We design your invitation and share a preview within 24–48 hours. You review and approve before anything goes live."
      },
      {
        q: "How long does it take?",
        a: "We typically deliver a preview within 24–48 hours of receiving your details. Final delivery after your approval is usually the same day."
      },
      {
        q: "What information do I need to provide?",
        a: "Names, event date(s), venue(s), a short story about your occasion, and any photos you'd like to include. We'll guide you through everything on WhatsApp — no lengthy forms to fill."
      },
      {
        q: "Can I make changes after approving?",
        a: "Yes. If a venue or time changes, just message us and we'll update it. Since it's a link, all your guests automatically see the latest version — no need to resend anything."
      }
    ]
  },

  {
    icon:  "₹",
    title: "Pricing",
    items: [
      {
        q: "What does a digital wedding invitation cost in India?",
        a: "A digital web invitation starts at ₹699. A video invitation is ₹999. The Complete bundle — web + video — is ₹1,499, saving you ₹199. All at launch price."
      },
      {
        q: "Are there any hidden charges?",
        a: "No. The price you see is the price you pay. No hosting fees, no per-guest fees, no surprises."
      },
      {
        q: "How do I pay?",
        a: "Payment is via UPI, bank transfer or any standard Indian payment method. We'll share payment details over WhatsApp once you're ready to proceed."
      }
    ]
  },

  {
    icon:  "💌",
    title: "About the invitation",
    items: [
      {
        q: "How do guests open the invitation?",
        a: "You share one beautiful link — on WhatsApp, Instagram, email or SMS. Guests just tap it and the invitation opens in their browser. No app to download, nothing to install."
      },
      {
        q: "Does it work on all phones?",
        a: "Yes. Every invitation is built mobile-first and tested on Android and iPhone. It looks beautiful on any screen size."
      },
      {
        q: "Can I get invitations for birthdays and baby showers?",
        a: "Absolutely. InviteWalla creates custom digital invitations for weddings, birthdays, baby showers, engagements, anniversaries, housewarmings and any special occasion."
      },
      {
        q: "Is InviteWalla available outside India?",
        a: "We're based in India and primarily serve Indian clients, but we're happy to create digital invitations for anyone anywhere. Prices are in INR."
      }
    ]
  }

];
