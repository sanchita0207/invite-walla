# InviteWalla

Beautiful digital invitations for life's special moments.

**Live site:** [invitewalla.com](https://invitewalla.com)

---

## Project structure

```
/                          → InviteWalla marketing homepage
/invite/mitali-karan/      → Mitali & Karan showcase invitation (first invitation)
/invite/{slug}/            → Future customer invitations (manually created)
```

Each invitation is fully self-contained:

```
/invite/{slug}/
  index.html               ← Presentation layer (copy from mitali-karan)
  invitation-data.js       ← Customer-specific content (only file to edit)
  css/                     ← Invitation styles (copy from mitali-karan)
  images/                  ← Customer photos
  music/                   ← Optional background music (e.g. music.mp3)
```

---

## Creating a new invitation (manual workflow)

1. Duplicate `invite/mitali-karan/` to `invite/{new-slug}/`
2. Edit `invite/{new-slug}/invitation-data.js` — update all values for the new couple/event
3. Replace `images/` with the customer's photos
4. Optionally add `music/` for background music
5. Push to GitHub — the invitation is live

The `index.html` and all CSS should not need to change between invitations.

### invitation-data.js fields

| Field | Description |
|---|---|
| `bride.name` | First/full name |
| `bride.displayTitle` | Name shown on opening screen (e.g. "Dr. Priya") |
| `bride.photo` | Path to photo (relative to invitation folder) |
| `groom.*` | Same as bride fields |
| `weddingDate.display` | Formatted date string shown on screen |
| `weddingDate.iso` | ISO date `YYYY-MM-DD` used for countdown |
| `weddingDate.countdownTime` | Time countdown targets `HH:MM:SS` |
| `taglines.*` | All copy text: opening, hero, story, footer |
| `venue.*` | Primary venue (name, address, mapsUrl) |
| `events[]` | Array of ceremony objects (icon, title, date, time, description, venue) |
| `gallery[]` | Array of image paths; set `large: true` for the hero gallery image |
| `music.src` | Path to audio file; leave empty to disable |

---

## GitHub Pages setup

### 1. Enable GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose `main` branch, `/ (root)` folder.
5. Click **Save**.

GitHub Pages will serve the site from the root of the repository.

### 2. Configure invitewalla.com as the custom domain

1. In **Settings → Pages → Custom domain**, enter `invitewalla.com`.
2. Click **Save**. GitHub will create a `CNAME` file in the repo root (already included in this repo).
3. GitHub will attempt DNS verification. It may take a few minutes.

### 3. DNS records at your domain registrar

Add the following records at your DNS registrar (e.g. GoDaddy, Namecheap, Cloudflare):

**Option A — Apex domain (recommended)**

Add four `A` records pointing `invitewalla.com` to GitHub Pages IPs:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
```

Also add a `CNAME` for `www`:

```
Type    Name    Value
CNAME   www     your-github-username.github.io
```

**Option B — Subdomain only (e.g. www.invitewalla.com)**

```
Type    Name    Value
CNAME   www     your-github-username.github.io
```

> DNS propagation can take up to 48 hours, but usually completes in under an hour.

### 4. HTTPS

GitHub Pages automatically provisions a free TLS certificate via Let's Encrypt once:
- The custom domain is configured in Settings → Pages
- DNS has propagated correctly

Once the certificate is issued, enable **Enforce HTTPS** in Settings → Pages. This may take up to 24 hours after DNS propagation.

### 5. Domain verification (optional but recommended)

To prevent domain takeover if the repo is ever deleted:

1. Go to **GitHub Settings → Pages → Verified domains**.
2. Click **Add a domain** and enter `invitewalla.com`.
3. GitHub will provide a DNS `TXT` record to add at your registrar.
4. Add the record and click **Verify**.

---

## WhatsApp configuration

The enquiry form and WhatsApp CTA in `index.html` use a single placeholder:

```
INVITEWALLA_WHATSAPP_NUMBER
```

Search the file for this string and replace it with your WhatsApp Business number in international format without `+` or spaces.

**Example:** For +91 98765 43210, use `919876543210`

It appears in two places in `index.html` — replace both.

---

## Local development

No build step required. Open any HTML file directly in a browser, or use a simple static server:

```bash
# Python
python3 -m http.server 8080

# Node (if installed)
npx serve .
```

Then open:
- `http://localhost:8080/` — marketing homepage
- `http://localhost:8080/invite/mitali-karan/` — showcase invitation

---

## Roadmap (future, not yet built)

- [ ] Form backend (Formspree / EmailJS)
- [ ] Additional invitation templates
- [ ] RSVP functionality
- [ ] Customer dashboard
- [ ] Online invitation editor
